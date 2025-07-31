# 🍽️ Dishboard Landing Page

A modern, responsive landing page for **Dishboard** - the restaurant analytics platform that helps food businesses outshine their competition.

## ✨ Features

- 🌍 **Bilingual Support** - Spanish (ES) and English (EN) versions
- 📱 **Fully Responsive** - Mobile-first design with perfect desktop experience  
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components
- 📊 **Interactive Charts** - Data visualization with Recharts
- 📧 **Waitlist Integration** - Connected to Brevo for email collection
- 🔒 **reCAPTCHA Protection** - Spam protection on forms
- 🗺️ **Google Places API** - Autocomplete for business locations
- ⚡ **Next.js 15** - Latest React framework with App Router

## 🚀 Live Demo

- **Spanish**: [Visit Landing Page](https://dishboard-landing.vercel.app)
- **English**: [Visit Landing Page](https://dishboard-landing.vercel.app/en)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Forms**: Brevo (Sendinblue)
- **Maps**: Google Places API
- **Package Manager**: pnpm

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ElTuni/dishboard-landing.git
   cd dishboard-landing
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Google Maps API key:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
dishboard-landing/
├── app/                    # Next.js App Router
│   ├── en/                # English version
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Spanish homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── waitlist-form.tsx # Spanish form component
│   └── waitlist-form-en.tsx # English form component
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key for Places autocomplete | Yes |

## 📦 Available Scripts

```bash
# Development
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint
```

## 🎨 Design System

This project uses a consistent design system with:

- **Colors**: Custom green palette (#8EE0B2) with neutral grays
- **Typography**: Geist Sans and Geist Mono fonts
- **Spacing**: Tailwind's default spacing scale
- **Components**: shadcn/ui for consistent, accessible components

## 🔧 Configuration

### reCAPTCHA Setup

1. Get your reCAPTCHA site key from [Google reCAPTCHA](https://www.google.com/recaptcha/)
2. Add your domains to the reCAPTCHA configuration:
   - `localhost` (for development)
   - Your production domain
3. The site key is already configured in the components

### Google Places API

1. Enable the Places API in Google Cloud Console
2. Create an API key with Places API access
3. Add your domain restrictions for security
4. Add the key to your environment variables

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add your environment variables in Vercel dashboard
3. Deploy automatically on every push to main

### Other Platforms

This is a standard Next.js application and can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For questions or support, please reach out:

- **GitHub Issues**: [Create an issue](https://github.com/ElTuni/dishboard-landing/issues)
- **Email**: hello@dishboard.com

---

**Built with ❤️ for restaurants that want to thrive, not just survive.**