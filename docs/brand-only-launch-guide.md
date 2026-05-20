# Brand-Only Launch Guide

This project is now prepared to launch the homepage and brand pages first.

What is already set up:

1. `/sitemap.xml` is generated automatically from the homepage and all brand pages only.
2. `/robots.txt` points search engines to the sitemap.
3. Model pages are `noindex` by default so they are not meant to appear in Google until you enable them later.
4. The production site URL is controlled by an environment variable instead of being hard-coded in one place.

## 1. Before You Push

Work from this folder:

```powershell
cd C:\Users\Rahma\new_engine\engine-market
```

Check the important routes locally:

```powershell
npm run dev
```

Then open these in the browser:

1. `http://localhost:3000/`
2. `http://localhost:3000/alfa-romeo`
3. `http://localhost:3000/sitemap.xml`
4. `http://localhost:3000/robots.txt`

Expected result:

1. Home page loads.
2. Brand page loads.
3. `sitemap.xml` contains `/` plus brand URLs only.
4. `robots.txt` includes the sitemap URL.

## 2. Environment Variables To Use In Production

Set these in your hosting platform:

```text
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
INDEX_MODEL_PAGES=false
```

Use your real domain for `NEXT_PUBLIC_SITE_URL`.

Keep `INDEX_MODEL_PAGES=false` until your model pages are finished.

## 3. Create The New GitHub Repository

In the new GitHub account:

1. Sign in.
2. Click `New repository`.
3. Repository name suggestion: `engine-market-brands`.
4. Set it to `Private` if you do not want it public yet.
5. Do not add a README, `.gitignore`, or license on GitHub.
6. Click `Create repository`.

## 4. Connect This Folder To The New GitHub Repo

First check whether this folder already has a remote:

```powershell
git remote -v
```

If there is no remote yet, run:

```powershell
git remote add origin https://github.com/YOUR-NEW-USERNAME/engine-market-brands.git
```

If `origin` already points somewhere else and you want to keep that old connection, run:

```powershell
git remote rename origin old-origin
git remote add origin https://github.com/YOUR-NEW-USERNAME/engine-market-brands.git
```

If `origin` already points somewhere else and you want to replace it, run:

```powershell
git remote set-url origin https://github.com/YOUR-NEW-USERNAME/engine-market-brands.git
```

## 5. Commit And Push

Review your changes:

```powershell
git status
```

Stage everything you want in the new repo:

```powershell
git add .
```

Create a launch commit:

```powershell
git commit -m "Prepare homepage and brand pages for launch"
```

Push to GitHub:

```powershell
git branch -M main
git push -u origin main
```

If GitHub asks for sign-in:

1. Use the new GitHub account.
2. Approve the browser/device login flow if prompted.
3. If password auth fails, use GitHub Desktop or a Personal Access Token.

## 6. Deploy On Vercel

Recommended because this is a Next.js app.

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Sign in with the new GitHub account.
3. Import `engine-market-brands`.
4. Keep the framework as `Next.js`.
5. In `Environment Variables`, add:
   `NEXT_PUBLIC_SITE_URL=https://your-real-domain.com`
6. Add:
   `INDEX_MODEL_PAGES=false`
7. Click `Deploy`.

## 7. Add Your Domain

After the first deploy finishes:

1. Open the Vercel project.
2. Go to `Settings`.
3. Open `Domains`.
4. Add your real domain.
5. Follow Vercel's DNS instructions exactly.
6. Once DNS is connected, update `NEXT_PUBLIC_SITE_URL` so it matches the final domain exactly.
7. Redeploy if needed.

## 8. Final Checks After Going Live

Open these live URLs:

1. `https://your-real-domain.com/`
2. `https://your-real-domain.com/alfa-romeo`
3. `https://your-real-domain.com/sitemap.xml`
4. `https://your-real-domain.com/robots.txt`

Check these things:

1. Brand pages render correctly.
2. `sitemap.xml` lists only homepage and brand pages.
3. `robots.txt` points to the live sitemap.
4. Model pages are not in the sitemap.

## 9. Submit The Sitemap To Google

After the domain is live:

1. Open Google Search Console.
2. Add your domain property.
3. Verify ownership using the DNS method.
4. Open `Sitemaps`.
5. Submit:

```text
https://your-real-domain.com/sitemap.xml
```

## 10. When Model Pages Are Ready Later

When you want model pages indexed too:

1. Change the environment variable:

```text
INDEX_MODEL_PAGES=true
```

2. Update the sitemap logic to include model routes.
3. Redeploy.
4. Resubmit the sitemap in Search Console.

## Optional Next Step

If you want a truly stripped-down launch repo with only:

1. homepage
2. brand pages
3. brand JSON data

we can make a second clean deploy branch or repo copy that excludes unfinished model files entirely.
