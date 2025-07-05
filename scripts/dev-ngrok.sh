#!/bin/bash

# Script pour lancer Next.js avec ngrok
# Alternative à HTTPS local pour Privy

echo "🌐 Configuration ngrok pour Privy..."

# Vérifier si ngrok est installé
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok n'est pas installé"
    echo "📦 Installation de ngrok..."
    brew install ngrok
fi

# Tuer les processus existants
echo "🔄 Arrêt des processus existants..."
pkill -f "next" 2>/dev/null
pkill -f "ngrok" 2>/dev/null

# Lancer Next.js en arrière-plan
echo "🚀 Lancement de Next.js..."
npm run dev &
NEXT_PID=$!

# Attendre que Next.js démarre
echo "⏳ Attente du démarrage de Next.js..."
sleep 10

# Lancer ngrok
echo "🌐 Lancement de ngrok..."
ngrok http 3000 &
NGROK_PID=$!

# Attendre que ngrok démarre
sleep 5

# Récupérer l'URL ngrok
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"[^"]*"' | cut -d'"' -f4)

if [ -n "$NGROK_URL" ]; then
    echo "✅ ngrok démarré avec succès!"
    echo "🌐 URL HTTPS: $NGROK_URL"
    echo "🔒 HTTPS activé pour Privy"
    echo ""
    echo "📋 Configuration Privy Console:"
    echo "1. Aller sur https://console.privy.io"
    echo "2. Ajouter cette URL dans les domaines autorisés:"
    echo "   $NGROK_URL"
    echo ""
    echo "🧪 Test:"
    echo "Ouvrir $NGROK_URL/profile"
    echo ""
    echo "🛑 Pour arrêter: Ctrl+C"
else
    echo "❌ Erreur: Impossible de récupérer l'URL ngrok"
    kill $NEXT_PID 2>/dev/null
    kill $NGROK_PID 2>/dev/null
    exit 1
fi

# Attendre l'interruption
trap "echo '🛑 Arrêt des services...'; kill $NEXT_PID 2>/dev/null; kill $NGROK_PID 2>/dev/null; exit" INT
wait 