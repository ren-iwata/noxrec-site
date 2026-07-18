# NO.X / Ren Iwata

Canonical source for the NO.X personal website published at https://noxrec.com.

## Production pipeline

```text
GitHub: ren-iwata/noxrec-site (main)
  -> Vercel: nox-preview-sigma-v2
  -> https://noxrec.com
```

The `main` branch is the production branch. Future changes should be made through a feature branch or pull request, reviewed in a Vercel Preview Deployment, and then merged into `main`.

The previous Vercel project `noxrec-site` is intentionally disconnected from GitHub and retained only as a dormant rollback reference.

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deployment

Static deployment. No build command or package dependencies are required.
