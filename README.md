````md
# 🚗 CarteGriseNFT - Vehicle Registration on the Blockchain

This project allows minting car registration certificates (Carte Grise) as NFTs on the Oasis Sapphire testnet. It includes role-based permissions for concessionnaires, assurance companies, and contrôle technique centers.

## 🧰 Stack
- Solidity (Oasis Sapphire EVM)
- Hardhat
- TypeScript
- IPFS (soon: Web3.Storage)
- Role-based smart contract logic

## 🛠️ Setup

```bash
git clone <repo>
cd CarteGriseNFT
npm install
````

Create a `.env` file:

```env
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
```

## 📦 Compile Contracts

```bash
npx hardhat compile
```

## 🚀 Deploy to Oasis Sapphire Testnet

```bash
npx hardhat deploy-carte-grise --network sapphire-testnet
```

## 🔐 Assign Roles

```bash
npx hardhat set-role \
  --contract <DEPLOYED_CONTRACT_ADDRESS> \
  --address <WALLET_ADDRESS> \
  --role 2 \
  --network sapphire-testnet
```

Role mapping:

* 1 = Admin
* 2 = Concessionnaire
* 3 = Assurance
* 4 = Contrôle Technique

## 🪙 Mint a Vehicle NFT

```bash
npx hardhat mint-vehicle \
  --contract <DEPLOYED_CONTRACT_ADDRESS> \
  --to <WALLET_ADDRESS> \
  --vin VIN123456 \
  --brand Tesla \
  --model ModelS \
  --mileage 1234 \
  --uri https://ipfs.io/ipfs/Qm... \
  --network sapphire-testnet
```

## 🧪 Tasks List (in `tasks/index.ts`)

* `deploy-carte-grise`
* `set-role`
* `mint-vehicle`

## 🧙‍♂️ Author

Asma
Idir
Thomas

````
