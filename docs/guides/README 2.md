# MetaCarTag - Decentralized Vehicle Registration System

A decentralized vehicle registration system using NFTs and decentralized identity with Self.ID/Ceramic integration and Privy wallet authentication.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Vercel account (for deployment)

### Local Development

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
Create a `.env.local` file:
```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_SELF_CERAMIC_API_URL=https://ceramic-clay.3boxlabs.com
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

## 🌐 Deployment on Vercel

### Automatic HTTPS with Vercel

Vercel provides automatic HTTPS for all deployments, making it the perfect solution for Privy integration.

### Deploy Steps

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Set environment variables in Vercel Dashboard:**
   - Go to your project settings
   - Add environment variables:
     - `NEXT_PUBLIC_PRIVY_APP_ID`
     - `NEXT_PUBLIC_SELF_CERAMIC_API_URL`

5. **Configure Privy Console:**
   - Go to [Privy Console](https://console.privy.io)
   - Add your Vercel domain (e.g., `https://your-app.vercel.app`)
   - Update your `NEXT_PUBLIC_PRIVY_APP_ID` with the new app ID

### Production Deployment

```bash
vercel --prod
```

## 🔧 Configuration

### Privy Setup
1. Create an app at [console.privy.io](https://console.privy.io)
2. Add your domain (local: `http://localhost:3000`, production: your Vercel URL)
3. Copy the App ID to your environment variables

### Self.ID/Ceramic Setup
- Uses Clay testnet by default
- Configure Ceramic node URL in environment variables
- Supports profile management and verification

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── profile/        # Profile management
│   └── ui/             # UI components
├── hooks/              # Custom React hooks
├── services/           # External service integrations
│   ├── privy/          # Privy wallet integration
│   └── selfid/         # Self.ID/Ceramic integration
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🛠️ Features

- **Wallet Authentication**: Privy integration for seamless wallet onboarding
- **Decentralized Identity**: Self.ID/Ceramic profile management
- **Role-based Access**: Vehicle owner, insurer, and dealer roles
- **Profile Management**: CRUD operations for user profiles
- **Verification System**: Trust status and badge management
- **Modern UI**: Tailwind CSS with responsive design

## 🔒 Security

- HTTPS automatically provided by Vercel
- Environment variables for sensitive configuration
- Secure wallet authentication flow
- Decentralized identity verification

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_PRIVY_APP_ID` | Privy App ID from console | Yes |
| `NEXT_PUBLIC_SELF_CERAMIC_API_URL` | Ceramic node URL | Yes |

## 🚀 Benefits of Vercel Deployment

- **Automatic HTTPS**: No manual SSL configuration needed
- **Global CDN**: Fast loading worldwide
- **Automatic Deployments**: Deploy on git push
- **Environment Variables**: Secure configuration management
- **Preview Deployments**: Test changes before production
- **Analytics**: Built-in performance monitoring

## 🐛 Troubleshooting

### Common Issues

1. **Privy App ID Error**
   - Ensure your domain is added to Privy Console
   - Check environment variables are set correctly

2. **Build Errors**
   - Run `npm install` to ensure all dependencies
   - Check TypeScript errors with `npm run lint`

3. **Environment Variables**
   - Verify all required variables are set in Vercel
   - Restart development server after changes

## 📄 License

MIT License - see LICENSE file for details