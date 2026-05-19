"""
Upload the Astro `dist/` build to the UniME web space via SFTP.

Reads the password from the SFTP_PASSWORD env var (never hardcoded).
Mirrors dist/ -> <remote_root>/<dest>/, creating remote directories as needed
and overwriting existing files. Files only present on the remote are NOT deleted.
"""
import os
import posixpath
import stat
import sys
from pathlib import Path

import paramiko

HOST = "ww3.unime.it"
PORT = 42000
USER = "andmorana@unime.it"
DEST = "www/html"  # relative to user's home on the server

LOCAL_DIST = Path(__file__).resolve().parent.parent / "dist"


def mkdir_p(sftp: paramiko.SFTPClient, remote_path: str) -> None:
    """Recursively create a remote directory (like `mkdir -p`)."""
    if remote_path in ("", "/", "."):
        return
    try:
        sftp.stat(remote_path)
        return
    except FileNotFoundError:
        pass
    parent = posixpath.dirname(remote_path.rstrip("/"))
    if parent and parent != remote_path:
        mkdir_p(sftp, parent)
    try:
        sftp.mkdir(remote_path)
    except OSError:
        # already exists (race) — ignore
        pass


def upload_tree(sftp: paramiko.SFTPClient, local_root: Path, remote_root: str) -> None:
    mkdir_p(sftp, remote_root)
    files = [p for p in local_root.rglob("*") if p.is_file()]
    total = len(files)
    print(f"Uploading {total} files from {local_root} -> {remote_root}/")
    for idx, local_file in enumerate(files, 1):
        rel = local_file.relative_to(local_root).as_posix()
        remote_file = posixpath.join(remote_root, rel)
        remote_dir = posixpath.dirname(remote_file)
        if remote_dir:
            mkdir_p(sftp, remote_dir)
        sftp.put(str(local_file), remote_file)
        if idx % 10 == 0 or idx == total:
            print(f"  [{idx}/{total}] {rel}")


def main() -> int:
    password = os.environ.get("SFTP_PASSWORD")
    if not password:
        print("ERROR: SFTP_PASSWORD env var not set", file=sys.stderr)
        return 2
    if not LOCAL_DIST.is_dir():
        print(f"ERROR: build folder not found at {LOCAL_DIST}", file=sys.stderr)
        return 2

    print(f"Connecting to {USER}@{HOST}:{PORT} ...")
    transport = paramiko.Transport((HOST, PORT))
    try:
        transport.connect(username=USER, password=password)
        sftp = paramiko.SFTPClient.from_transport(transport)
        assert sftp is not None
        try:
            home = sftp.normalize(".")
            print(f"Remote home: {home}")
            upload_tree(sftp, LOCAL_DIST, DEST)
        finally:
            sftp.close()
    finally:
        transport.close()
    print("Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
