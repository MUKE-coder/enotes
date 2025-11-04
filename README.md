# Entrepreneur Notes 📝

A smart, mobile-first note-taking app built specifically for busy entrepreneurs. Features AI-powered categorization, priority management, reminders, and automated daily/weekly/monthly reports.

## ✨ Features

- **🤖 AI-Powered**: Automatic note categorization, priority suggestions, and smart tagging using Claude AI
- **📱 Mobile-First**: Designed to feel like a native mobile app with touch-optimized UI
- **🎯 Smart Priorities**: Notes are categorized as Urgent, Important, or Minor
- **📌 Pin Important Notes**: Keep critical information at the top
- **⏰ Reminders**: Set reminders for time-sensitive tasks
- **📊 Reports**: AI-generated daily, weekly, and monthly activity summaries
- **🔒 Secure**: Google OAuth authentication via Better Auth
- **⚡ Fast**: Built on Next.js 15 with optimized performance

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Authentication**: Better Auth with Google OAuth
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **AI**: Anthropic Claude (Sonnet 4.5)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- A Neon PostgreSQL database
- Google OAuth credentials
- Anthropic API key

### 1. Clone and Install

```bash
git clone <your-repo>
cd entrepreneur-notes
npm install
```

### 2. Set Up Neon PostgreSQL

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project
3. Copy the connection string

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or select existing)
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy Client ID and Client Secret

### 4. Get Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com)
2. Create an API key
3. Copy the key

### 5. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Database (from Neon)
DATABASE_URL="postgresql://user:password@your-host.neon.tech/entrepreneur_notes?sslmode=require"

# Better Auth (generate with: openssl rand -base64 32)
BETTER_AUTH_SECRET="your-32-char-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Anthropic AI
ANTHROPIC_API_KEY="sk-ant-your-api-key"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 6. Initialize Database

```bash
npx prisma generate
npx prisma db push
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Creating Notes

1. Click the blue **+** button (bottom right)
2. Write your note content
3. Toggle "Smart Analysis" to let AI suggest priority and tags
4. Optionally set a reminder
5. Click "Create Note"

### Managing Notes

- **Pin**: Tap the menu (⋮) → Pin to keep important notes at the top
- **Complete**: Mark notes as done
- **Delete**: Remove notes you no longer need
- **Filter**: Use the filter buttons (All, Urgent, Important, Pinned)
- **Search**: Type in the search bar to find specific notes

### Viewing Reports

1. Tap the **📊** icon in the header
2. Switch between Daily, Weekly, or Monthly reports
3. View AI-generated summaries and statistics
4. Click "Refresh" to regenerate the report

## 🏗️ Project Structure

```
entrepreneur-notes/
├── app/
│   ├── api/
│   │   ├── auth/[...all]/     # Better Auth routes
│   │   ├── notes/             # Note CRUD operations
│   │   └── reports/           # Report generation
│   ├── dashboard/             # Main app interface
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── CreateNoteModal.tsx    # Note creation UI
│   ├── NoteCard.tsx           # Individual note display
│   └── ReportModal.tsx        # Report viewing UI
├── lib/
│   ├── ai.ts                  # Claude AI integration
│   ├── auth.ts                # Better Auth config
│   ├── prisma.ts              # Prisma client
│   └── utils.ts               # Utility functions
├── prisma/
│   └── schema.prisma          # Database schema
└── public/
    └── manifest.json          # PWA manifest
```

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js` and `app/globals.css` to customize the color scheme.

### Adding New Features

The app is built with extensibility in mind:

- Add new note fields in `prisma/schema.prisma`
- Extend AI capabilities in `lib/ai.ts`
- Create new API routes in `app/api/`
- Add UI components in `components/`

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update `BETTER_AUTH_URL` and redirect URIs to your production domain
5. Deploy!

### Database Migrations

When you update the schema:

```bash
npx prisma db push
```

## 🐛 Troubleshooting

### Authentication Issues

- Verify Google OAuth redirect URIs match exactly
- Check that `BETTER_AUTH_URL` matches your domain
- Ensure `BETTER_AUTH_SECRET` is at least 32 characters

### Database Connection

- Confirm DATABASE_URL includes `?sslmode=require`
- Verify Neon project is active
- Check network connectivity

### AI Features Not Working

- Verify Anthropic API key is valid
- Check API usage limits
- Review console for error messages

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 💬 Support

For issues or questions, please open a GitHub issue.

---

Built with ❤️ for entrepreneurs who want to stay organized and productive.
