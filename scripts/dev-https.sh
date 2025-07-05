#!/bin/bash

# Script pour lancer Next.js en HTTPS local
# Nécessaire pour tester Privy en développement

echo "🔒 Configuration HTTPS pour le développement local..."

# Vérifier si mkcert est installé
if ! command -v mkcert &> /dev/null; then
    echo "❌ mkcert n'est pas installé"
    echo "📦 Installation de mkcert..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install mkcert
        mkcert -install
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get install mkcert
        mkcert -install
    else
        echo "❌ Système non supporté. Veuillez installer mkcert manuellement."
        echo "📖 Guide: https://github.com/FiloSottile/mkcert"
        exit 1
    fi
fi

# Créer les certificats
echo "🔐 Création des certificats SSL..."
mkcert -key-file ./localhost-key.pem -cert-file ./localhost.pem localhost 127.0.0.1

# Lancer Next.js en HTTPS
echo "🚀 Lancement de Next.js en HTTPS..."
HTTPS=true SSL_CRT_FILE=./localhost.pem SSL_KEY_FILE=./localhost-key.pem npm run dev 