# Deployment Guide

This project is configured to deploy on [Netlify](https://docs.netlify.com) with automatic testing before each build.

## 🚀 Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

## 📋 Prerequisites

- A [Netlify account](https://app.netlify.com/signup)
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## 🔧 Configuration

The project includes a `netlify.toml` file that configures:

### Build Process
1. **Install Bun** - Downloads and installs Bun runtime
2. **Install Dependencies** - Runs `bun install`
3. **Run Tests** - Executes `bun test` (build fails if tests fail ✅)
4. **Build Project** - Runs `bun run build` using Vite

### Build Settings
```toml
[build]
  command = "Install Bun → bun install → bun test → bun run build"
  publish = "dist"  # Vite output directory
  
[build.environment]
  NODE_VERSION = "20"  # Required for Bun compatibility
```

### Features Included
- ✅ **Automatic Testing** - Tests run before every build
- ✅ **Security Headers** - X-Frame-Options, CSP, etc.
- ✅ **SPA Routing** - Proper redirects for React Router
- ✅ **Bun Runtime** - Uses Bun for faster builds

## 📦 Deploy from Git

### Step 1: Push to Git
```bash
git add .
git commit -m "feat: add Netlify deployment config"
git push origin main
```

### Step 2: Connect to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository: `pokemon-guessing`
5. Netlify will auto-detect the `netlify.toml` settings:
   - **Build command**: (configured in netlify.toml)
   - **Publish directory**: `dist`
   - **Node version**: `20`

6. Click **"Deploy site"**

### Step 3: Wait for Build

The build process will:
1. ⏳ Install Bun
2. ⏳ Install dependencies
3. ✅ Run 20 tests across 2 files
4. ⏳ Build with Vite
5. 🚀 Deploy to Netlify CDN

**If tests fail, the deployment is automatically cancelled!** ⚠️

## 🔄 Continuous Deployment

Every push to your main branch will automatically:
1. Trigger a new build
2. Run all tests
3. Deploy if tests pass ✅
4. Cancel if tests fail ❌

## 🌍 Environment Variables

If you need environment variables for your API or other services:

1. Go to **Site settings** → **Build & deploy** → **Environment variables**
2. Add variables:
   - Click **"Add a variable"**
   - Enter key/value pairs
   - Save

Example:
```bash
VITE_API_URL=https://pokeapi.co/api/v2
VITE_APP_NAME=Pokemon Guessing Game
```

Access in your code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🎯 Deploy Contexts

Netlify supports different deploy contexts:

### Production
- Branch: `main` or `master`
- URL: `your-site-name.netlify.app`

### Preview Deploys
- Any pull request automatically gets a preview URL
- Tests run on preview deploys too!
- URL: `deploy-preview-{PR#}--your-site.netlify.app`

### Branch Deploys
Configure in Netlify to deploy specific branches:
- Settings → Build & deploy → Continuous Deployment → Branches

## 🐛 Troubleshooting

### Build Fails with "bun: command not found"
- Check that the Bun installation command runs successfully
- Verify NODE_VERSION is set to 20

### Tests Fail on Netlify but Pass Locally
- Check environment differences
- Verify all dependencies are in `package.json`
- Check `bunfig.toml` is committed

### Build Timeout
- Default timeout: 15 minutes (free tier)
- Optimize tests or upgrade plan if needed

### SPA Routing Issues (404 on refresh)
- Verify the redirect rule in `netlify.toml`:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

## 📊 Build Logs

To view build logs:
1. Go to **Deploys** in your Netlify dashboard
2. Click on any deploy
3. View the build log to see:
   - Bun installation
   - Test results
   - Build output

## 🔒 Security

The `netlify.toml` includes security headers:
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-XSS-Protection: 1; mode=block` - XSS protection
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer info

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Build Configuration](https://docs.netlify.com/configure-builds/overview/)
- [Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)
- [Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/)
- [Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)

## 🎉 Done!

Your Pokémon Guessing Game should now be live on Netlify with:
- ✅ Automatic testing on every deploy
- ✅ Continuous deployment from Git
- ✅ Preview deployments for PRs
- ✅ Fast global CDN delivery
- ✅ HTTPS enabled by default

---

**Happy Deploying! 🚀**

