# Complete Setup Guide for Entrepreneur Notes

This guide walks you through setting up the entire application from scratch.

## Table of Contents
1. [Initial Setup](#1-initial-setup)
2. [Database Setup (Neon)](#2-database-setup-neon)
3. [Google OAuth Setup](#3-google-oauth-setup)
4. [Anthropic AI Setup](#4-anthropic-ai-setup)
5. [Environment Configuration](#5-environment-configuration)
6. [Running the App](#6-running-the-app)
7. [Deployment](#7-deployment)

---

## 1. Initial Setup

### Install Node.js
Make sure you have Node.js 18 or higher installed:
```bash
node --version  # Should be v18 or higher
```

If not, download from [nodejs.org](https://nodejs.org/)

### Clone/Download the Project
```bash
# If you have the code locally
cd entrepreneur-notes

# Install dependencies
npm install
```

---

## 2. Database Setup (Neon)

Neon is a serverless PostgreSQL database perfect for Next.js apps.

### Step 2.1: Create Neon Account
1. Go to [https://neon.tech](https://neon.tech)
2. Click "Sign Up" (free tier available)
3. Sign up with GitHub or email

### Step 2.2: Create New Project
1. Click "New Project"
2. Give it a name: `entrepreneur-notes`
3. Select a region close to your users
4. Click "Create Project"

### Step 2.3: Get Connection String
1. In your project dashboard, find the "Connection Details" section
2. Copy the connection string (should look like):
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
3. **Save this for later!**

---

## 3. Google OAuth Setup

This allows users to sign in with their Google account.

### Step 3.1: Create Google Cloud Project
1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Click "Select a project" → "New Project"
3. Name it: `entrepreneur-notes`
4. Click "Create"

### Step 3.2: Enable Google+ API
1. In the sidebar, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

### Step 3.3: Configure OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen"
2. Select "External" (unless you have Google Workspace)
3. Click "Create"
4. Fill in required fields:
   - **App name**: Entrepreneur Notes
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click "Save and Continue"
6. Skip "Scopes" page (click "Save and Continue")
7. Add test users if needed
8. Click "Save and Continue"

### Step 3.4: Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Application type: "Web application"
4. Name: `Entrepreneur Notes Web`
5. **Authorized redirect URIs** - Add:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
   (Add production URL later when deploying)
6. Click "Create"
7. **Copy the Client ID and Client Secret** - you'll need these!

---

## 4. Anthropic AI Setup

This enables smart AI features for note analysis and reports.

### Step 4.1: Create Anthropic Account
1. Go to [https://console.anthropic.com](https://console.anthropic.com)
2. Sign up for an account
3. Add billing information (required for API access)

### Step 4.2: Generate API Key
1. In the console, go to "API Keys"
2. Click "Create Key"
3. Give it a name: `entrepreneur-notes`
4. **Copy the API key** - you won't be able to see it again!
   - It starts with `sk-ant-`

---

## 5. Environment Configuration

### Step 5.1: Create .env File
In your project root, create a file named `.env`:

```bash
# You can copy from .env.example
cp .env.example .env
```

### Step 5.2: Fill in Environment Variables

Open `.env` and add your credentials:

```env
# ===== DATABASE (from Step 2) =====
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"

# ===== BETTER AUTH =====
# Generate a secure random string (32+ characters)
# Option 1: Use online generator
# Option 2: Run this command:
#   openssl rand -base64 32
BETTER_AUTH_SECRET="your-generated-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# ===== GOOGLE OAUTH (from Step 3) =====
GOOGLE_CLIENT_ID="1234567890-xxxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxx"

# ===== ANTHROPIC AI (from Step 4) =====
ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxx"

# ===== NEXT.JS =====
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 5.3: Generate BETTER_AUTH_SECRET

**On Mac/Linux:**
```bash
openssl rand -base64 32
```

**On Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

**Or use an online generator:**
- [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

Paste the result in your `.env` file.

---

## 6. Running the App

### Step 6.1: Set Up Database Schema
This creates all the necessary tables in your database:

```bash
npx prisma generate
npx prisma db push
```

You should see output confirming the tables were created.

### Step 6.2: Start Development Server
```bash
npm run dev
```

You should see:
```
  ▲ Next.js 15.0.3
  - Local:        http://localhost:3000
```

### Step 6.3: Test the App
1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the landing page
3. Click "Sign in with Google"
4. Sign in with your Google account
5. You should be redirected to `/dashboard`
6. Try creating a note!

---

## 7. Deployment (Vercel)

### Step 7.1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/entrepreneur-notes.git
git push -u origin main
```

### Step 7.2: Deploy to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy" (don't add env vars yet)
5. Wait for initial deployment

### Step 7.3: Add Environment Variables in Vercel
1. Go to your project → Settings → Environment Variables
2. Add all variables from your `.env` file
3. **Important**: Update these values:
   ```
   BETTER_AUTH_URL="https://your-app.vercel.app"
   NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"
   ```

### Step 7.4: Update Google OAuth Redirect URI
1. Go back to [Google Cloud Console](https://console.cloud.google.com)
2. Go to your OAuth credentials
3. Add to **Authorized redirect URIs**:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
4. Click "Save"

### Step 7.5: Redeploy
1. In Vercel, go to Deployments
2. Click "Redeploy" on the latest deployment
3. Your app should now be live!

---

## Troubleshooting

### "Cannot connect to database"
- Double-check your `DATABASE_URL` is correct
- Make sure it includes `?sslmode=require`
- Verify your Neon project is active

### "OAuth error" or "redirect_uri_mismatch"
- Ensure Google OAuth redirect URI exactly matches
- Check that `BETTER_AUTH_URL` is correct
- Try clearing browser cookies

### "AI features not working"
- Verify your Anthropic API key is valid
- Check you have billing set up in Anthropic console
- Look for errors in browser console (F12)

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then run `npm install`

---

## Getting Help

If you're still stuck:
1. Check the main README.md
2. Look at the error messages in terminal
3. Open browser DevTools (F12) and check Console tab
4. Search for the error message online

---

## Next Steps

Once everything is working:
- Customize the colors and branding
- Add your own logo/favicon
- Invite test users
- Set up monitoring (e.g., Sentry)
- Configure domain name

Enjoy your new entrepreneur note-taking app! 🚀
