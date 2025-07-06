# MetaCarTag - Decentralized Vehicle Management

A Next.js application for decentralized vehicle management using NFTs and Self.ID, deployed on Oasis Sapphire blockchain.

## 🚗 Features

- **NFT Vehicle Management**: Create and manage vehicle NFTs with confidential metadata
- **Role-Based Access**: Seller and Owner dashboards with different permissions
- **3D Interactive NFTs**: Beautiful 3D Carte Grise visualization
- **Privy Authentication**: Secure wallet-based authentication
- **Oasis Sapphire**: Confidential computing for private data
- **Self.ID Integration**: Decentralized identity management

## 📁 Project Structure

```
├── src/                    # Frontend application
│   ├── app/               # Next.js app router
│   ├── components/        # React components
│   │   ├── 3D/           # 3D NFT visualization
│   │   ├── Dashboards/   # Role-based dashboards
│   │   ├── Forms/        # Form components
│   │   └── ui/           # UI components
│   ├── services/         # Business logic services
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
├── blockchain/           # Smart contracts and deployment
│   ├── contracts/        # Solidity contracts
│   ├── scripts/          # Deployment scripts
│   ├── tasks/            # Hardhat tasks
│   └── test/             # Contract tests
├── docs/                 # Documentation
│   ├── guides/           # User guides
│   ├── deployment/       # Deployment guides
│   └── api/              # API documentation
└── utils/                # Utility scripts and tools
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or Privy wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ETHGlobal-Cannes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
   PRIVATE_KEY=your_wallet_private_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Deploy contracts** (optional)
   ```bash
   cd blockchain
   npx hardhat deploy --network sapphireTestnet
   ```

## 🏗️ Architecture

### Frontend (Next.js)
- **Authentication**: Privy for wallet-based auth
- **State Management**: React hooks and context
- **UI Framework**: Tailwind CSS + shadcn/ui
- **3D Visualization**: CSS 3D transforms

### Blockchain (Oasis Sapphire)
- **Smart Contracts**: ERC721 with confidential metadata
- **Network**: Oasis Sapphire testnet/mainnet
- **Privacy**: Confidential computing for private data

### Key Components

#### Authentication Flow
1. User connects wallet via Privy
2. Self.ID profile creation/verification
3. Role-based dashboard access

#### NFT Minting Process
1. Seller inputs vehicle data
2. Metadata uploaded to IPFS (mock)
3. Smart contract interaction via Privy
4. NFT minted with public/private data

#### Data Privacy
- **Public Data**: Vehicle specs, VIN, license plate
- **Private Data**: Maintenance history, financial info
- **Confidential Computing**: Oasis Sapphire encryption

## 📚 Documentation

- [Quick Start Guide](docs/guides/QUICK_START.md)
- [Role System](docs/guides/ROLES_SYSTEM.md)
- [Deployment Guide](docs/deployment/DEPLOYMENT.md)
- [API Documentation](docs/api/CURRENT_STATE.md)

## 🔧 Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint

# Blockchain
cd blockchain
npx hardhat compile  # Compile contracts
npx hardhat test     # Run tests
npx hardhat deploy   # Deploy contracts
```

### Code Organization

#### Components
- **Modular Structure**: Each component in its own directory
- **Type Safety**: Full TypeScript support
- **Reusable**: Shared UI components

#### Services
- **Blockchain Service**: Smart contract interactions
- **Self.ID Service**: Identity management
- **Verification Service**: Data validation

#### Hooks
- **Authentication**: Privy integration
- **Blockchain**: Contract interactions
- **Data Management**: State management

## 🛡️ Security

- **Wallet Security**: Privy for secure authentication
- **Data Privacy**: Oasis Sapphire confidential computing
- **Input Validation**: Comprehensive data verification
- **Role-Based Access**: Secure permission system

## 🌐 Deployment

### Frontend
- **Vercel**: Automatic deployment from main branch
- **Environment**: Production environment variables
- **Domain**: Custom domain configuration

### Smart Contracts
- **Network**: Oasis Sapphire testnet/mainnet
- **Verification**: Contract verification on explorer
- **Monitoring**: Transaction monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [documentation](docs/)
- Open an issue on GitHub
- Contact the development team

---

**MetaCarTag** - Revolutionizing vehicle management with blockchain technology 🚗✨