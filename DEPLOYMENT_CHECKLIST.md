# 🚀 Deployment Checklist

Use this checklist when deploying to production to ensure everything is configured correctly.

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All TypeScript errors resolved (`npm run build` succeeds)
- [ ] No console errors in browser
- [ ] All environment variables documented
- [ ] Sensitive data removed from code
- [ ] `.env` files not committed to git

### ✅ Testing
- [ ] Manual testing completed on all major flows
- [ ] Tested on multiple devices (mobile, tablet, desktop)
- [ ] Tested on different browsers (Chrome, Safari, Firefox)
- [ ] Google sign-in works in development
- [ ] Notes can be created, updated, deleted
- [ ] AI features work (create note with AI enabled)
- [ ] Reports generate successfully
- [ ] Search and filters work

### ✅ Database
- [ ] Prisma schema is up to date
- [ ] Database migrations successful
- [ ] Indexes are in place
- [ ] Neon project is active and accessible

### ✅ Authentication
- [ ] Google OAuth credentials created
- [ ] Development redirect URI configured
- [ ] OAuth consent screen completed
- [ ] Test user can sign in successfully

### ✅ AI Integration
- [ ] Anthropic API key obtained
- [ ] Billing configured in Anthropic console
- [ ] AI responses tested and working
- [ ] Usage limits understood

---

## Deployment Steps (Vercel)

### Step 1: Prepare Repository
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial production deploy"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/entrepreneur-notes.git
git branch -M main
git push -u origin main
```

- [ ] Code pushed to GitHub
- [ ] Repository is accessible

### Step 2: Create Vercel Project
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Click "New Project"
- [ ] Import GitHub repository
- [ ] Project name set
- [ ] Click "Deploy" (initial deployment)

### Step 3: Configure Environment Variables

In Vercel dashboard → Settings → Environment Variables, add:

#### Database
```
DATABASE_URL = [Your Neon connection string]
```
- [ ] DATABASE_URL added
- [ ] Connection string includes `?sslmode=require`

#### Authentication
```
BETTER_AUTH_SECRET = [Your generated secret]
BETTER_AUTH_URL = https://your-app.vercel.app
NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
```
- [ ] BETTER_AUTH_SECRET added (32+ characters)
- [ ] BETTER_AUTH_URL set to production domain
- [ ] NEXT_PUBLIC_APP_URL set to production domain

#### OAuth
```
GOOGLE_CLIENT_ID = [Your Google Client ID]
GOOGLE_CLIENT_SECRET = [Your Google Client Secret]
```
- [ ] GOOGLE_CLIENT_ID added
- [ ] GOOGLE_CLIENT_SECRET added

#### AI
```
ANTHROPIC_API_KEY = [Your Anthropic API key]
```
- [ ] ANTHROPIC_API_KEY added
- [ ] Starts with `sk-ant-`

### Step 4: Update Google OAuth
- [ ] Go to Google Cloud Console
- [ ] Navigate to your OAuth credentials
- [ ] Add production redirect URI:
  ```
  https://your-app.vercel.app/api/auth/callback/google
  ```
- [ ] Click "Save"

### Step 5: Redeploy
- [ ] In Vercel, go to Deployments tab
- [ ] Click "Redeploy" on latest deployment
- [ ] Wait for deployment to complete
- [ ] Check deployment logs for errors

### Step 6: Verify Deployment
- [ ] Visit your production URL
- [ ] Landing page loads correctly
- [ ] Click "Sign in with Google"
- [ ] Google OAuth flow works
- [ ] Redirected to dashboard
- [ ] Can create a note
- [ ] AI features work
- [ ] Reports generate
- [ ] Mobile view works correctly

---

## Post-Deployment Checklist

### ✅ Security
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] OAuth redirect URIs are correct
- [ ] Environment variables are not exposed
- [ ] API routes require authentication
- [ ] No sensitive data in client bundles

### ✅ Performance
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score > 90
- [ ] Images are optimized
- [ ] No console errors in production

### ✅ Mobile Experience
- [ ] Test on actual phone
- [ ] "Add to Home Screen" works
- [ ] Touch targets are easy to hit
- [ ] Modals slide up from bottom
- [ ] No horizontal scrolling

### ✅ Monitoring Setup
- [ ] Vercel Analytics enabled (optional)
- [ ] Error tracking set up (Sentry - optional)
- [ ] Uptime monitoring (UptimeRobot - optional)

### ✅ User Experience
- [ ] Create 3-5 test notes with real content
- [ ] Test all priority levels
- [ ] Pin some notes
- [ ] Set reminders
- [ ] Generate all report types
- [ ] Search functionality works
- [ ] Filters work correctly

---

## Custom Domain Setup (Optional)

If you want to use your own domain instead of `.vercel.app`:

### Step 1: Buy Domain
- [ ] Purchase domain from Namecheap, GoDaddy, etc.

### Step 2: Add to Vercel
- [ ] In Vercel dashboard → Domains
- [ ] Click "Add"
- [ ] Enter your domain
- [ ] Follow DNS configuration instructions

### Step 3: Update Environment Variables
- [ ] Update `BETTER_AUTH_URL` to your domain
- [ ] Update `NEXT_PUBLIC_APP_URL` to your domain

### Step 4: Update OAuth
- [ ] Add new redirect URI in Google Console:
  ```
  https://yourdomain.com/api/auth/callback/google
  ```

### Step 5: Redeploy
- [ ] Redeploy in Vercel
- [ ] Test with new domain

---

## Troubleshooting Common Issues

### Issue: OAuth Error "redirect_uri_mismatch"
**Solution:**
1. Check Google Console redirect URIs
2. Verify `BETTER_AUTH_URL` matches exactly
3. No trailing slashes
4. HTTP vs HTTPS must match

### Issue: Database Connection Failed
**Solution:**
1. Check `DATABASE_URL` is correct
2. Ensure `?sslmode=require` is at the end
3. Verify Neon project is active
4. Check IP allowlist in Neon (if configured)

### Issue: AI Not Working
**Solution:**
1. Verify `ANTHROPIC_API_KEY` is correct
2. Check Anthropic console for errors
3. Ensure billing is set up
4. Check API rate limits

### Issue: Environment Variables Not Working
**Solution:**
1. Check variable names (exact match)
2. Redeploy after adding variables
3. Check for typos
4. Verify no extra spaces

### Issue: 404 on Dashboard
**Solution:**
1. Clear browser cache
2. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
3. Check deployment logs in Vercel
4. Verify build completed successfully

---

## Production Best Practices

### Daily
- [ ] Monitor error logs in Vercel
- [ ] Check for any user reports

### Weekly
- [ ] Review Anthropic API usage
- [ ] Check database size (Neon dashboard)
- [ ] Review deployment metrics

### Monthly
- [ ] Update dependencies: `npm outdated`
- [ ] Security audit: `npm audit`
- [ ] Review costs (Vercel, Neon, Anthropic)
- [ ] Backup database

### Quarterly
- [ ] Major version updates
- [ ] Performance audit
- [ ] Security review
- [ ] User feedback session

---

## Scaling Checklist

### When You Hit 100 Users
- [ ] Monitor database performance
- [ ] Set up error tracking (Sentry)
- [ ] Add basic analytics
- [ ] Consider rate limiting

### When You Hit 1000 Users
- [ ] Upgrade Vercel plan if needed
- [ ] Optimize database queries
- [ ] Add caching layer (Redis)
- [ ] Set up monitoring alerts

### When You Hit 10,000 Users
- [ ] Database read replicas
- [ ] CDN for static assets
- [ ] Background job processing
- [ ] Dedicated support system

---

## Rollback Plan

If something goes wrong:

### Quick Rollback (Vercel)
1. Go to Deployments in Vercel
2. Find previous working deployment
3. Click "..." menu
4. Select "Promote to Production"

### Database Rollback
1. Check Neon backups
2. Restore from backup if needed
3. Note: May lose recent data

### Environment Variables
1. Keep a backup of your `.env` file locally
2. Can quickly restore variables in Vercel

---

## Success Metrics

After deployment, track these:

### Technical Metrics
- [ ] Uptime > 99.9%
- [ ] Page load < 3s
- [ ] Error rate < 0.1%
- [ ] API response time < 500ms

### User Metrics
- [ ] Daily active users
- [ ] Notes created per user
- [ ] AI feature usage rate
- [ ] Report generation frequency

### Business Metrics
- [ ] User retention
- [ ] Sign-up conversion rate
- [ ] Mobile vs desktop usage
- [ ] Feature adoption rates

---

## Emergency Contacts

Have these ready:

- **Vercel Status**: status.vercel.com
- **Neon Status**: [status page]
- **Google OAuth Support**: [support link]
- **Anthropic Support**: support@anthropic.com

---

## Final Checks Before Going Live

- [ ] All checklists above completed
- [ ] Test user can complete full flow
- [ ] Mobile experience verified
- [ ] Performance is acceptable
- [ ] Monitoring is in place
- [ ] Backup plan documented
- [ ] Support email configured
- [ ] Terms of Service added (if needed)
- [ ] Privacy Policy added (if needed)

---

## 🎉 You're Ready!

Once all checks are complete:

1. Announce to your first users
2. Monitor closely for first 24 hours
3. Gather feedback
4. Iterate and improve

**Remember:** It's better to launch and iterate than to wait for perfection!

---

**Need help?** Refer to SETUP_GUIDE.md for detailed troubleshooting.
