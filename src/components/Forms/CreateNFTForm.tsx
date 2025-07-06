'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CalendarIcon, Car, FileText, Shield, AlertCircle } from 'lucide-react';

interface VehicleNFTData {
  brand: string;
  model: string;
  year: string;
  licensePlate: string;
  vin: string;
  color: string;
  mileage: string;
  description: string;
  price: string;
  engineType: string;
  fuelType: string;
  transmission: string;
}

interface CreateNFTFormProps {
  onSubmit?: (data: VehicleNFTData) => void;
}

export const CreateNFTForm: React.FC<CreateNFTFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<VehicleNFTData>({
    brand: '',
    model: '',
    year: '',
    licensePlate: '',
    vin: '',
    color: '',
    mileage: '',
    description: '',
    price: '',
    engineType: '',
    fuelType: '',
    transmission: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  const handleInputChange = (field: keyof VehicleNFTData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      // TODO: This will be implemented by the team (Asma's branch)
      // For now, just simulate a delay and show success message
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setFeedback({
        type: 'success',
        message: 'NFT creation prepared successfully! The mint functionality will be available soon.'
      });

      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: 'Failed to prepare NFT creation. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return formData.brand && formData.model && formData.year && 
           formData.licensePlate && formData.vin && formData.color;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Car className="w-5 h-5 mr-2" />
          Create Vehicle NFT
        </CardTitle>
        <p className="text-gray-600 text-sm">
          Fill in the vehicle details to create an NFT. The mint functionality will be available soon.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Feedback Alert */}
          {feedback && (
            <Alert className={feedback.type === 'error' ? 'border-red-200 bg-red-50' : 
                           feedback.type === 'success' ? 'border-green-200 bg-green-50' : 
                           'border-blue-200 bg-blue-50'}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className={feedback.type === 'error' ? 'text-red-800' : 
                                       feedback.type === 'success' ? 'text-green-800' : 
                                       'text-blue-800'}>
                {feedback.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  placeholder="e.g., 2023"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="color">Color *</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => handleInputChange('color', e.target.value)}
                  placeholder="e.g., White, Black, Silver"
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle Identification */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Vehicle Identification
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="licensePlate">License Plate *</Label>
                <Input
                  id="licensePlate"
                  value={formData.licensePlate}
                  onChange={(e) => handleInputChange('licensePlate', e.target.value.toUpperCase())}
                  placeholder="e.g., AB-123-CD"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="vin">VIN (Vehicle Identification Number) *</Label>
                <Input
                  id="vin"
                  value={formData.vin}
                  onChange={(e) => handleInputChange('vin', e.target.value.toUpperCase())}
                  placeholder="17-character VIN"
                  maxLength={17}
                  required
                />
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Car className="w-4 h-4 mr-2" />
              Technical Specifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="mileage">Mileage (km)</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange('mileage', e.target.value)}
                  placeholder="e.g., 50000"
                  min="0"
                />
              </div>
              
              <div>
                <Label htmlFor="engineType">Engine Type</Label>
                <Input
                  id="engineType"
                  value={formData.engineType}
                  onChange={(e) => handleInputChange('engineType', e.target.value)}
                  placeholder="e.g., 2.0L Turbo"
                />
              </div>
              
              <div>
                <Label htmlFor="fuelType">Fuel Type</Label>
                <Input
                  id="fuelType"
                  value={formData.fuelType}
                  onChange={(e) => handleInputChange('fuelType', e.target.value)}
                  placeholder="e.g., Gasoline, Electric, Hybrid"
                />
              </div>
              
              <div>
                <Label htmlFor="transmission">Transmission</Label>
                <Input
                  id="transmission"
                  value={formData.transmission}
                  onChange={(e) => handleInputChange('transmission', e.target.value)}
                  placeholder="e.g., Automatic, Manual"
                />
              </div>
              
              <div>
                <Label htmlFor="price">Price (€)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="e.g., 25000"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Additional details about the vehicle, condition, features..."
                rows={4}
              />
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Privacy & Security</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Vehicle data will be securely stored and encrypted. 
                  Only authorized parties will be able to access the metadata.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                ⚠️ Mint Disabled
              </Badge>
              <span className="text-sm text-gray-600">
                Mint functionality coming soon
              </span>
            </div>
            
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Preparing...
                </>
              ) : (
                <>
                  <Car className="w-4 h-4 mr-2" />
                  Prepare NFT Creation
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 