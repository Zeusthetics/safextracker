# Deploy to GitHub Pages

This project is configured for GitHub Pages using a relative Vite base path, so it works both at a repository URL (`username.github.io/repository/`) and at a user-site URL (`username.github.io/`).

1. Create a GitHub repository and upload the contents of this project folder (the files inside `safex-engineering-react`, not the outer ZIP folder).
2. Make sure the default branch is named `main`.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Push/commit the files to `main`. The included workflow `.github/workflows/deploy.yml` installs dependencies, builds the Vite site, and deploys `dist`.
6. Open **Actions** and wait for “Deploy SAFEX Engineering Tracker to GitHub Pages” to complete successfully. GitHub will show the published URL in **Settings → Pages**.

Every future push to `main` automatically rebuilds and republishes the site.

The tracker reads the Google Sheet directly in the visitor's browser. Ensure the spreadsheet/tabs are shared with permission that allows the intended viewers to read the data. Do not put private or confidential data in a publicly accessible sheet.
