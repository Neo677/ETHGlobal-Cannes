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

# Créer les certificats s'ils n'existent pas
if [ ! -f "./localhost.pem" ] || [ ! -f "./localhost-key.pem" ]; then
    echo "🔐 Création des certificats SSL..."
    mkcert -key-file ./localhost-key.pem -cert-file ./localhost.pem localhost 127.0.0.1
fi

# Vérifier que les certificats existent
if [ ! -f "./localhost.pem" ] || [ ! -f "./localhost-key.pem" ]; then
    echo "❌ Erreur: Les certificats SSL n'ont pas été créés"
    exit 1
fi

echo "✅ Certificats SSL prêts"
echo "🔐 Certificat: ./localhost.pem"
echo "🔑 Clé: ./localhost-key.pem"

# Lancer Next.js en HTTPS
echo "🚀 Lancement de Next.js en HTTPS..."
echo "📱 URL: https://localhost:3000"
echo "🔒 HTTPS activé pour Privy"

# Variables d'environnement pour HTTPS
export HTTPS=true
export SSL_CRT_FILE=./localhost.pem
export SSL_KEY_FILE=./localhost-key.pem

# Lancer Next.js
npm run dev 