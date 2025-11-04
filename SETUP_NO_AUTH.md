# Quick Setup - No Authentication Version

## ✅ Changes Made
- **Removed Google OAuth** - No sign-in required
- **Removed Better Auth** - Simplified setup
- **Default User ID** - All notes use "default-user"
- **Direct Access** - App loads directly to dashboard

## 🚀 Super Simple Setup (3 Steps)

### Step 1: Install Dependencies
```bash
cd entrepreneur-notes
npm install
```

**Note:** Make sure to install `autoprefixer`:
```bash
npm install autoprefixer
```

### Step 2: Set Up Database (Neon PostgreSQL)

1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string
4. Create `.env` file:

```env
# Database
DATABASE_URL="your-neon-connection-string-here?sslmode=require"

# Anthropic AI (optional - for smart features)
ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Without AI (works but no smart features):**
```env
DATABASE_URL="your-neon-connection-string-here?sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 3: Initialize Database & Run

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start the app
npm run dev
```

Visit **http://localhost:3000** - You'll be redirected directly to the dashboard! 🎉

---

## 🎯 That's It!

No OAuth setup needed. No user management. Just notes.

### What Changed:
- **Before:** Had to set up Google OAuth, Better Auth, etc.
- **Now:** Just database + optional AI key

### All Features Still Work:
✅ Create notes  
✅ Pin notes  
✅ Set priorities (Urgent/Important/Minor)  
✅ Reminders  
✅ Search & filter  
✅ AI categorization (if API key provided)  
✅ Daily/weekly/monthly reports (if API key provided)  

---

## 🤔 AI Features (Optional)

If you want AI features (auto-categorization, smart reports):

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account
3. Add billing info
4. Create an API key
5. Add to `.env`:
   ```env
   ANTHROPIC_API_KEY="sk-ant-api03-your-key-here"
   ```

**Without AI:** App works perfectly, just won't auto-suggest priorities or generate reports.

---

## 🔒 Adding Your Own Auth Later

When you're ready to add authentication:

1. You can implement any auth system you want
2. Just replace `DEFAULT_USER_ID = 'default-user'` in:
   - `app/api/notes/route.ts`
   - `app/api/notes/[id]/route.ts`
   - `app/api/reports/route.ts`
3. With your actual user ID from your auth system

---

## 📱 Next Steps

1. **Test it out** - Create some notes
2. **Try AI features** - Toggle "Smart Analysis" when creating notes
3. **Generate reports** - Click the chart icon (📊)
4. **Customize** - Change colors in `tailwind.config.js`
5. **Deploy** - Push to Vercel when ready

---

## 🐛 Troubleshooting

**"Cannot find module 'autoprefixer'"**
```bash
npm install autoprefixer postcss tailwindcss
```

**Database connection error**
- Make sure connection string has `?sslmode=require` at the end
- Check your Neon project is active

**AI not working**
- Check your Anthropic API key is correct
- Make sure billing is set up in Anthropic console
- AI features are optional - app works without them

---

## 💡 Pro Tip

Start without AI to test the app, then add the API key later when you're ready!

Enjoy your simplified note-taking app! 🚀
