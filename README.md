# Portfolio Website

A portfolio site built from Figma, set up for **GitHub Pages**.

Original design: [Portfolio Website on Figma](https://www.figma.com/design/HmpkyT9RHE58bMhHAUPyjU/Portfolio-Website).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`. Preview with:

```bash
npm run preview
```

## Deploy to GitHub Pages

1. **Create a repo** on GitHub (see [Creating a repository for your site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-a-repository-for-your-site)).
   - For a **user/org site** (e.g. `https://yourusername.github.io`), name the repo `yourusername.github.io`.
   - For a **project site** (e.g. `https://yourusername.github.io/portfolio-website`), any repo name is fine.

2. **Push this project** to the new repo (default branch `main`):

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. **Enable GitHub Pages** in the repo:
   - **Settings** → **Pages**
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.

4. Each push to `main` will run the **Deploy to GitHub Pages** workflow: it builds the site and deploys the `dist/` output. Your site will be at:
   - User/org site: `https://yourusername.github.io`
   - Project site: `https://yourusername.github.io/portfolio-website` (replace `portfolio-website` with your repo name)

Allow a few minutes after the first push for the site to appear.
