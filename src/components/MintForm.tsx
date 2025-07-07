'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Car, Zap, Play, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useMintCarteGrise, VehicleData } from '@/services/mintCarteGrise';
import { useToast } from '@/hooks/use-toast';

interface MintFormProps {
  onMintSuccess?: (tokenId: string, transactionHash: string) => void;
}

export const MintForm: React.FC<MintFormProps> = ({ onMintSuccess }) => {
  const { mint, isAuthenticated } = useMintCarteGrise();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    vin: '',
    brand: '',
    model: '',
    mileage: '',
    year: '',
    color: '',
    licensePlate: '',
    description: '',
  });

  const [isMockMinting, setIsMockMinting] = useState(false);
  const [isRealMinting, setIsRealMinting] = useState(false);
  const [mintResult, setMintResult] = useState<{
    success: boolean;
    tokenId?: string;
    transactionHash?: string;
    error?: string;
  } | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMockMint = async () => {
    setIsMockMinting(true);
    setMintResult(null);

    try {
      // Simulate minting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTokenId = Math.floor(Math.random() * 10000).toString();
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64);
      
      setMintResult({
        success: true,
        tokenId: mockTokenId,
        transactionHash: mockTxHash,
      });

      toast({
        title: "Mock Mint Successful!",
        description: `Token ID: ${mockTokenId}`,
        variant: "default",
      });

      if (onMintSuccess) {
        onMintSuccess(mockTokenId, mockTxHash);
      }
    } catch (error) {
      setMintResult({
        success: false,
        error: 'Mock mint failed',
      });
    } finally {
      setIsMockMinting(false);
    }
  };

  const handleRealMint = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please connect your wallet to mint NFTs",
        variant: "destructive",
      });
      return;
    }

    setIsRealMinting(true);
    setMintResult(null);

    try {
      const vehicleData: VehicleData = {
        brand: formData.brand,
        model: formData.model,
        mileage: parseInt(formData.mileage) || 0,
        vin: formData.vin,
        year: parseInt(formData.year) || new Date().getFullYear(),
        color: formData.color,
        licensePlate: formData.licensePlate,
        description: formData.description,
      };

      const result = await mint(vehicleData);

      setMintResult(result);

      if (result.success) {
        toast({
          title: "NFT Minted Successfully!",
          description: `Token ID: ${result.tokenId}`,
          variant: "default",
        });

        if (onMintSuccess && result.tokenId && result.transactionHash) {
          onMintSuccess(result.tokenId, result.transactionHash);
        }
      } else {
        toast({
          title: "Minting Failed",
          description: result.error || "Unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      setMintResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsRealMinting(false);
    }
  };

  const isFormValid = () => {
    return formData.vin && formData.brand && formData.model && formData.mileage;
  };

  const resetForm = () => {
    setFormData({
      vin: '',
      brand: '',
      model: '',
      mileage: '',
      year: '',
      color: '',
      licensePlate: '',
      description: '',
    });
    setMintResult(null);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Car className="w-5 h-5 mr-2" />
          Mint Vehicle NFT
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Create a new vehicle NFT on the Oasis Sapphire testnet
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* Authentication Status */}
          <Alert className={isAuthenticated ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className={isAuthenticated ? 'text-green-800' : 'text-yellow-800'}>
              {isAuthenticated ? 'Wallet connected - Ready to mint' : 'Please connect your wallet to mint NFTs'}
            </AlertDescription>
          </Alert>

          {/* Mint Result */}
          {mintResult && (
            <Alert className={mintResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              {mintResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={mintResult.success ? 'text-green-800' : 'text-red-800'}>
                {mintResult.success ? (
                  <div>
                    <p className="font-semibold">Minting Successful!</p>
                    <p className="text-sm">Token ID: {mintResult.tokenId}</p>
                    {mintResult.transactionHash && (
                      <p className="text-sm">Tx Hash: {mintResult.transactionHash}</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="font-semibold">Minting Failed</p>
                    <p className="text-sm">{mintResult.error}</p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vin">VIN (Vehicle Identification Number) *</Label>
              <Input
                id="vin"
                value={formData.vin}
                onChange={(e) => handleInputChange('vin', e.target.value.toUpperCase())}
                placeholder="e.g., 1HGBH41JXMN109186"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="brand">Brand *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                placeholder="e.g., Toyota, BMW, Tesla"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                placeholder="e.g., Camry, X5, Model 3"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="mileage">Mileage (km) *</Label>
              <Input
                id="mileage"
                type="number"
                value={formData.mileage}
                onChange={(e) => handleInputChange('mileage', e.target.value)}
                placeholder="e.g., 50000"
                min="0"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                placeholder="e.g., 2023"
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>
            
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleInputChange('color', e.target.value)}
                placeholder="e.g., White, Black, Silver"
              />
            </div>
            
            <div>
              <Label htmlFor="licensePlate">License Plate</Label>
              <Input
                id="licensePlate"
                value={formData.licensePlate}
                onChange={(e) => handleInputChange('licensePlate', e.target.value.toUpperCase())}
                placeholder="e.g., AB-123-CD"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Additional vehicle details..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              onClick={handleMockMint}
              disabled={!isFormValid() || isMockMinting || isRealMinting}
              variant="outline"
              className="flex-1"
            >
              {isMockMinting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isMockMinting ? 'Mock Minting...' : 'Test Mint (Mock)'}
            </Button>
            
            <Button
              type="button"
              onClick={handleRealMint}
              disabled={!isFormValid() || !isAuthenticated || isMockMinting || isRealMinting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isRealMinting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 mr-2" />
              )}
              {isRealMinting ? 'Minting...' : 'Real Mint'}
            </Button>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={resetForm}
              variant="ghost"
              size="sm"
            >
              Reset Form
            </Button>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant={isAuthenticated ? "default" : "secondary"}>
              {isAuthenticated ? "Wallet Connected" : "Wallet Disconnected"}
            </Badge>
            <Badge variant={isFormValid() ? "default" : "secondary"}>
              {isFormValid() ? "Form Valid" : "Form Incomplete"}
            </Badge>
            <Badge variant="outline">
              Oasis Sapphire Testnet
            </Badge>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 