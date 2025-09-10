# SafeAssets Site

This is a [Next.js](https://nextjs.org) website for SafeAssets Group, built with TypeScript, Tailwind CSS, and modern web technologies.

## 🚀 How to Refresh Your Site with a Version from Git

This guide explains how to update your SafeAssets website with the latest changes from the Git repository.

### Prerequisites

- Node.js 18+ installed on your system
- Git installed and configured
- Access to the SafeAssets repository

### Step 1: Pull Latest Changes from Git

```bash
# Navigate to your project directory
cd /path/to/your/safeassets-site

# Fetch and pull the latest changes
git fetch origin
git pull origin main

# Or pull from a specific branch
git pull origin your-branch-name
```

### Step 2: Install/Update Dependencies

```bash
# Install or update all dependencies
npm install

# Alternative: Clean install (recommended for production)
rm -rf node_modules package-lock.json
npm install
```

### Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your actual configuration values:
   ```bash
   # Required for contact form functionality
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   RESEND_API_KEY=your_resend_api_key
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   
   # Optional: Basic auth for preview environments
   BASIC_AUTH=username:password
   ```

### Step 4: Build and Test

```bash
# Lint the code
npm run lint

# Build for production
npm run build

# Start the production server
npm run start
```

Or for development:

```bash
# Start development server (with hot reload)
npm run dev
```

### Step 5: Deploy

#### Option A: Deploy to Vercel (Recommended)

1. Connect your repository to [Vercel](https://vercel.com)
2. Set environment variables in Vercel dashboard
3. Deploy automatically on every Git push

#### Option B: Deploy to Other Platforms

1. Build the application: `npm run build`
2. Upload the `.next` folder and other necessary files to your hosting provider
3. Set environment variables on your hosting platform
4. Start the application with `npm run start`

## 🔧 Development Workflow

### Local Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

The page auto-updates as you edit files. Main files to edit:
- `src/app/page.tsx` - Home page
- `src/app/about/page.tsx` - About page
- `src/components/` - Reusable components
- `public/` - Static assets (images, videos)

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test locally

3. Commit and push:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request for review

## 📁 Project Structure

```
safeassets-site/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── page.tsx        # Home page
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── industries/     # Industries pages
│   │   └── api/            # API routes
│   ├── components/         # React components
│   ├── lib/               # Utility functions
│   └── styles/            # Global styles
├── public/                # Static assets
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🔐 Environment Variables

The site uses several environment variables for different features:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | For contact form | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | For contact form | Supabase service role key |
| `RESEND_API_KEY` | For contact form | Resend email service key |
| `RECAPTCHA_SECRET_KEY` | For contact form | Google reCAPTCHA secret key |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | For contact form | Google reCAPTCHA site key |
| `BASIC_AUTH` | Optional | Basic authentication (format: `username:password`) |

**Note:** The site will build and run without these variables, but the contact form won't function until properly configured.

## 🛠️ Troubleshooting

### Build Fails

1. **Check Node.js version:** Ensure you're using Node.js 18 or later
   ```bash
   node --version
   ```

2. **Clear cache and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   npm run build
   ```

3. **Check for TypeScript errors:**
   ```bash
   npm run lint
   ```

### Site Not Loading After Deployment

1. **Check environment variables** are set correctly on your hosting platform
2. **Verify build completed successfully** - check build logs
3. **Check network/firewall settings** if using custom hosting

### Contact Form Not Working

1. **Verify all environment variables** are set in `.env.local`
2. **Check Supabase connection** and database setup
3. **Verify reCAPTCHA configuration** matches your domain

### Images/Videos Not Displaying

1. **Check file paths** in `public/` directory
2. **Verify file permissions** on hosting platform
3. **Check browser console** for 404 errors

## 📧 Support

If you encounter issues not covered in this guide:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review build logs for specific error messages
3. Contact the development team with:
   - Error messages
   - Steps to reproduce
   - Your environment details (Node.js version, OS, etc.)

---

## Technical Details

This project uses:
- **Framework:** Next.js 15.4.6
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Supabase
- **Email:** Resend
- **Deployment:** Vercel (recommended)

### Scripts Available

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
