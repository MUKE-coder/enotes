# Setup Guide - With Google Authentication

## ✅ What You Have Now

- **Beautiful Login Page** - Clean Google sign-in interface
- **User Avatar** - Shows in top-right corner when logged in
- **Logout Functionality** - Click avatar to logout
- **Secure Auth** - Better Auth with Google OAuth
- **All Original Features** - Notes, AI, Reports still work perfectly

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Install Dependencies

```bash
cd entrepreneur-notes
npm install
npm install autoprefixer  # Important!
```

### Step 2: Set Up Neon PostgreSQL

1. Go to [neon.tech](https://neon.tech)
2. Create free account
3. Create new project
4. Copy connection string (looks like: `postgresql://user:pass@host.neon.tech/db?sslmode=require`)

### Step 3: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure OAuth consent screen:
   - App name: "Entrepreneur Notes"
   - User support email: your email
6. Create OAuth Client:
   - Application type: **Web application**
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
7. Copy **Client ID** and **Client Secret**

### Step 4: Get Anthropic API Key (Optional)

For AI features:
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create account + add billing
3. Create API key
4. Copy it (starts with `sk-ant-`)

### Step 5: Configure Environment

Create `.env` file:

```env
# Database (from Step 2)
DATABASE_URL="postgresql://user:pass@host.neon.tech/db?sslmode=require"

# Better Auth - Generate with: openssl rand -base64 32
BETTER_AUTH_SECRET="your-32-character-secret-here"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth (from Step 3)
GOOGLE_CLIENT_ID="123456789-xxxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxxxxx"

# Anthropic AI (from Step 4 - Optional)
ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxx"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Generate BETTER_AUTH_SECRET:**
- Mac/Linux: `openssl rand -base64 32`
- Windows PowerShell: `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))`
- Or use: [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32)

### Step 6: Initialize Database & Run

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start the app
npm run dev
```

Visit **http://localhost:3000** 🎉

---

## 🎯 How It Works

### First Time:
1. Open http://localhost:3000
2. See beautiful login page
3. Click "Continue with Google"
4. Google OAuth flow
5. Redirected to dashboard

### After Login:
- Your avatar shows in top-right corner
- Click avatar to see:
  - Your name
  - Your email
  - **Logout** button

### Logout:
- Click your avatar
- Click "Logout"
- Redirected to login page

---

## 📸 Features

### Login Page
- Clean, modern design
- Only Google sign-in (no email/password)
- Mobile-optimized
- Shows app features

### Dashboard
- **Top-left**: "Notes" title
- **Top-right**: 
  - 📊 Reports icon
  - 👤 Your avatar (clickable)
- **Avatar Menu**:
  - Shows your name
  - Shows your email
  - Logout button

### All Original Features Still Work:
✅ Create notes with AI categorization  
✅ Pin important notes  
✅ Set priorities (Urgent/Important/Minor)  
✅ Reminders  
✅ Search & filter  
✅ Daily/weekly/monthly reports  

---

## 🐛 Troubleshooting

### "redirect_uri_mismatch" Error
**Fix:**
1. Go to Google Cloud Console
2. Check OAuth redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
3. No trailing slash
4. HTTP (not HTTPS) for localhost

### "Cannot find module 'autoprefixer'"
```bash
npm install autoprefixer postcss tailwindcss
```

### Database Connection Error
- Ensure connection string ends with `?sslmode=require`
- Check Neon project is active

### Not Redirecting After Login
- Clear browser cookies
- Check `BETTER_AUTH_URL` matches your app URL
- Restart dev server

### Avatar Not Showing
- Check Google permissions include profile & email
- Try signing out and back in

---

## 🔒 Security Notes

- **Sessions**: Stored securely with Better Auth
- **Cookies**: HttpOnly, secure
- **OAuth**: Industry-standard flow
- **Data**: Each user only sees their own notes

---

## 🚢 For Production Deployment

When deploying to Vercel:

1. **Update environment variables:**
   ```env
   BETTER_AUTH_URL="https://your-app.vercel.app"
   NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"
   ```

2. **Add production redirect URI in Google Console:**
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```

3. **Deploy to Vercel**
4. **Test login flow**

---

## 💡 Pro Tips

1. **Test locally first** - Make sure everything works
2. **Use incognito mode** - Test login flow
3. **Check browser console** - For any errors
4. **AI is optional** - App works without it

---

## 🎨 Customization

Want to change the look?

**Login page colors:**
- Edit: `app/page.tsx`

**Avatar menu:**
- Edit: `app/dashboard/page.tsx`

**Overall colors:**
- Edit: `tailwind.config.js`

---

Enjoy your secure, authenticated note-taking app! 🚀
