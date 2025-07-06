import React, { useState } from 'react';
import { useMintCarteGrise } from '../hooks/useMintCarteGrise';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { usePrivy } from '@privy-io/react-auth';

export const MintForm: React.FC = () => {
  const { user, authenticated } = usePrivy();
  const { mintNFT, mockMint, isMinting, lastResult } = useMintCarteGrise();
  
  const [formData, setFormData] = useState({
    vin: '',
    brand: '',
    model: '',
    mileage: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authenticated) {
      alert('Connecte-toi d\'abord avec Privy !');
      return;
    }

    // Validate form
    if (!formData.vin || !formData.brand || !formData.model || !formData.mileage) {
      alert('Remplis tous les champs !');
      return;
    }

    const mintData = {
      vin: formData.vin,
      brand: formData.brand,
      model: formData.model,
      mileage: parseInt(formData.mileage)
    };

    console.log('🚀 Minting NFT with data:', mintData);
    
    // Use mock mint for testing first
    const result = await mockMint(mintData);
    
    if (result.success) {
      alert(`✅ NFT minté avec succès !\nToken ID: ${result.tokenId}\nTransaction: ${result.transactionHash}`);
      // Reset form
      setFormData({ vin: '', brand: '', model: '', mileage: '' });
    } else {
      alert(`❌ Erreur: ${result.error}`);
    }
  };

  const handleRealMint = async () => {
    if (!authenticated) {
      alert('Connecte-toi d\'abord avec Privy !');
      return;
    }

    if (!formData.vin || !formData.brand || !formData.model || !formData.mileage) {
      alert('Remplis tous les champs !');
      return;
    }

    const mintData = {
      vin: formData.vin,
      brand: formData.brand,
      model: formData.model,
      mileage: parseInt(formData.mileage)
    };

    console.log('🚀 Real minting NFT with data:', mintData);
    
    const result = await mintNFT(mintData);
    
    if (result.success) {
      alert(`✅ NFT minté sur Oasis Sapphire !\nToken ID: ${result.tokenId}\nTransaction: ${result.transactionHash}`);
      setFormData({ vin: '', brand: '', model: '', mileage: '' });
    } else {
      alert(`❌ Erreur: ${result.error}`);
    }
  };

  if (!authenticated) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">🔐 Connexion requise</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Connecte-toi avec Privy pour créer des NFTs.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">🚗 Créer un NFT Carte Grise</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="vin">VIN (Numéro de série)</Label>
            <Input
              id="vin"
              name="vin"
              type="text"
              value={formData.vin}
              onChange={handleInputChange}
              placeholder="1HGBH41JXMN109186"
              required
            />
          </div>

          <div>
            <Label htmlFor="brand">Marque</Label>
            <Input
              id="brand"
              name="brand"
              type="text"
              value={formData.brand}
              onChange={handleInputChange}
              placeholder="Toyota"
              required
            />
          </div>

          <div>
            <Label htmlFor="model">Modèle</Label>
            <Input
              id="model"
              name="model"
              type="text"
              value={formData.model}
              onChange={handleInputChange}
              placeholder="Corolla"
              required
            />
          </div>

          <div>
            <Label htmlFor="mileage">Kilométrage</Label>
            <Input
              id="mileage"
              name="mileage"
              type="number"
              value={formData.mileage}
              onChange={handleInputChange}
              placeholder="50000"
              required
            />
          </div>

          <div className="space-y-2">
            <Button
              type="submit"
              disabled={isMinting}
              className="w-full"
            >
              {isMinting ? '🔄 Mint en cours...' : '🎭 Test Mint (Mock)'}
            </Button>

            <Button
              type="button"
              onClick={handleRealMint}
              disabled={isMinting}
              variant="outline"
              className="w-full"
            >
              {isMinting ? '🔄 Mint en cours...' : '🚀 Mint Réel (Oasis)'}
            </Button>
          </div>

          {lastResult && (
            <div className={`p-3 rounded-lg ${
              lastResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`text-sm ${
                lastResult.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {lastResult.success ? (
                  <>
                    ✅ <strong>Succès !</strong><br/>
                    Token ID: {lastResult.tokenId}<br/>
                    Transaction: {lastResult.transactionHash?.substring(0, 20)}...
                  </>
                ) : (
                  <>
                    ❌ <strong>Erreur :</strong><br/>
                    {lastResult.error}
                  </>
                )}
              </p>
            </div>
          )}
        </form>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>Info :</strong> Tu dois être connecté avec Privy et avoir le rôle "Seller" pour mint.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}; 