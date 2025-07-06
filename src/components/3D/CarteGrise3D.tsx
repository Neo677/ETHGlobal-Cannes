import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Eye, EyeOff, Download, Share2, QrCode, Scan } from 'lucide-react';

// Types
interface VehicleData {
  vin: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  owner: string;
  registrationDate: string;
  engineType: string;
  fuelType: string;
  transmission: string;
  licensePlate: string;
}

interface CarteGrise3DProps {
  vehicleData: VehicleData;
  onRotate?: () => void;
  onTogglePrivateData?: () => void;
  showPrivateData?: boolean;
}

// Constants
const ANIMATION_CONFIG = {
  FLOAT_SPEED: 1.5,
  ROTATION_SPEED: 0.8,
  FLOAT_AMPLITUDE: 8,
  ROTATION_AMPLITUDE: 2,
  ANIMATION_INTERVAL: 20
};

// Utility functions
const generateQRData = (vehicleData: VehicleData) => {
  return JSON.stringify({
    type: 'carte_grise_nft',
    vin: vehicleData.vin,
    brand: vehicleData.brand,
    model: vehicleData.model,
    year: vehicleData.year,
    licensePlate: vehicleData.licensePlate,
    owner: vehicleData.owner,
    registrationDate: vehicleData.registrationDate,
    blockchain: 'Oasis Sapphire',
    tokenId: vehicleData.vin.slice(-6),
    publicUrl: `https://metacartag.com/vehicle/${vehicleData.vin}`,
    timestamp: new Date().toISOString()
  });
};

// Sub-components
const ControlButtons: React.FC<{
  onRotate: () => void;
  onFlip: () => void;
  onToggleFloating: () => void;
  onScanQR: () => void;
  onDownload: () => void;
  onShare: () => void;
  isFlipped: boolean;
  isFloating: boolean;
  showQRCode: boolean;
}> = ({ onRotate, onFlip, onToggleFloating, onScanQR, onDownload, onShare, isFlipped, isFloating, showQRCode }) => (
  <div className="flex justify-center gap-4 mb-6 flex-wrap">
    <Button variant="outline" onClick={onRotate} className="flex items-center gap-2">
      <RotateCcw className="w-4 h-4" />
      Rotate 3D
    </Button>
    <Button variant="outline" onClick={onFlip} className="flex items-center gap-2">
      {isFlipped ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      {isFlipped ? 'Show Front' : 'Show Back'}
    </Button>
    <Button variant="outline" onClick={onToggleFloating} className="flex items-center gap-2">
      {isFloating ? '🔒 Stop Floating' : '🪶 Start Floating'}
    </Button>
    <Button variant="outline" onClick={onScanQR} className="flex items-center gap-2">
      <QrCode className="w-4 h-4" />
      {showQRCode ? 'Hide QR' : 'Show QR'}
    </Button>
    <Button variant="outline" onClick={onDownload} className="flex items-center gap-2">
      <Download className="w-4 h-4" />
      Download
    </Button>
    <Button variant="outline" onClick={onShare} className="flex items-center gap-2">
      <Share2 className="w-4 h-4" />
      Share
    </Button>
  </div>
);

const VehicleInfoSection: React.FC<{ vehicleData: VehicleData }> = ({ vehicleData }) => (
  <div className="space-y-4">
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Véhicule</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Marque</span>
          <span className="font-medium">{vehicleData.brand}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Modèle</span>
          <span className="font-medium">{vehicleData.model}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Année</span>
          <span className="font-medium">{vehicleData.year}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Couleur</span>
          <span className="font-medium">{vehicleData.color}</span>
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Identification</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">VIN</span>
          <span className="font-mono font-medium text-xs">{vehicleData.vin}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Plaque</span>
          <span className="font-medium">{vehicleData.licensePlate}</span>
        </div>
      </div>
    </div>
  </div>
);

const TechnicalInfoSection: React.FC<{ vehicleData: VehicleData }> = ({ vehicleData }) => (
  <div className="space-y-4">
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Technique</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Moteur</span>
          <span className="font-medium">{vehicleData.engineType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Carburant</span>
          <span className="font-medium">{vehicleData.fuelType}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Transmission</span>
          <span className="font-medium">{vehicleData.transmission}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Kilométrage</span>
          <span className="font-medium">{vehicleData.mileage.toLocaleString()} km</span>
        </div>
      </div>
    </div>
    
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Propriétaire</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Adresse</span>
          <span className="font-medium text-xs">{vehicleData.owner}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Date d'immat</span>
          <span className="font-medium">{vehicleData.registrationDate}</span>
        </div>
      </div>
    </div>
  </div>
);

const QRCodeSection: React.FC<{ showQRCode: boolean }> = ({ showQRCode }) => (
  <div className="mt-6 flex justify-center">
    <div className="w-20 h-20 bg-white rounded-lg border border-blue-200 flex items-center justify-center shadow-sm">
      {showQRCode ? (
        <div className="text-center">
          <div className="w-12 h-12 bg-black rounded flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <QrCode className="w-5 h-5 text-black" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Scannable</p>
        </div>
      ) : (
        <div className="text-center">
          <Scan className="w-6 h-6 text-blue-500" />
          <p className="text-xs text-gray-500 mt-1">QR Code</p>
        </div>
      )}
    </div>
  </div>
);

const PrivateDataSection: React.FC<{ showPrivateData: boolean; onTogglePrivateData?: () => void }> = ({ 
  showPrivateData, 
  onTogglePrivateData 
}) => (
  <div className="p-6">
    {showPrivateData ? (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Historique d'entretien</h3>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
              <span className="font-medium">2023-01-15:</span> Vidange huile
            </div>
            <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
              <span className="font-medium">2023-06-20:</span> Rotation pneus
            </div>
            <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
              <span className="font-medium">2023-12-10:</span> Révision complète
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Informations financières</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Prix d'achat</span>
              <span className="font-medium">25,000 €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Assurance</span>
              <span className="font-medium">Policy #123456</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">Notes personnelles</h3>
          <div className="p-3 bg-blue-50 rounded border border-blue-200 text-sm">
            Véhicule très fiable, excellent état général. 
            Idéal pour les trajets quotidiens.
          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Données Privées
          </h3>
          <p className="text-gray-600 mb-4 text-sm">
            Cliquez sur "Show Back" pour révéler les informations confidentielles
          </p>
          <Button onClick={onTogglePrivateData} size="sm">
            Révéler les données privées
          </Button>
        </div>
      </div>
    )}
  </div>
);

const QRCodeModal: React.FC<{ 
  showQRCode: boolean; 
  vehicleData: VehicleData; 
  onClose: () => void 
}> = ({ showQRCode, vehicleData, onClose }) => {
  if (!showQRCode) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-4">QR Code Carte Grise</h3>
          <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="text-center">
              <QrCode className="w-32 h-32 text-black mx-auto" />
              <p className="text-sm text-gray-600 mt-2">Scannez pour voir les détails</p>
            </div>
          </div>
          <div className="text-xs text-gray-600 mb-4">
            <p><strong>VIN:</strong> {vehicleData.vin}</p>
            <p><strong>Token ID:</strong> #{vehicleData.vin.slice(-6)}</p>
            <p><strong>Blockchain:</strong> Oasis Sapphire</p>
          </div>
          <Button onClick={onClose}>
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main component
export const CarteGrise3D: React.FC<CarteGrise3DProps> = ({
  vehicleData,
  onRotate,
  onTogglePrivateData,
  showPrivateData = false
}) => {
  const [rotation, setRotation] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFloating, setIsFloating] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);

  // Floating animation effect
  useEffect(() => {
    if (!isFloating) return;
    
    const animate = () => {
      if (floatingRef.current) {
        const time = Date.now() * 0.001;
        const y = Math.sin(time * ANIMATION_CONFIG.FLOAT_SPEED) * ANIMATION_CONFIG.FLOAT_AMPLITUDE;
        const rotateY = Math.sin(time * ANIMATION_CONFIG.ROTATION_SPEED) * ANIMATION_CONFIG.ROTATION_AMPLITUDE;
        floatingRef.current.style.transform = `translateY(${y}px) rotateY(${rotateY}deg)`;
      }
    };

    const interval = setInterval(animate, ANIMATION_CONFIG.ANIMATION_INTERVAL);
    return () => clearInterval(interval);
  }, [isFloating]);

  // Event handlers
  const handleRotate = () => {
    setRotation(prev => prev + 90);
    onRotate?.();
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleToggleFloating = () => {
    setIsFloating(!isFloating);
    if (floatingRef.current) {
      floatingRef.current.style.transform = '';
    }
  };

  const handleDownload = () => {
    console.log('Téléchargement de la carte grise 3D');
  };

  const handleShare = () => {
    console.log('Partage de la carte grise 3D');
  };

  const handleScanQR = () => {
    setShowQRCode(!showQRCode);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Control buttons */}
      <ControlButtons
        onRotate={handleRotate}
        onFlip={handleFlip}
        onToggleFloating={handleToggleFloating}
        onScanQR={handleScanQR}
        onDownload={handleDownload}
        onShare={handleShare}
        isFlipped={isFlipped}
        isFloating={isFloating}
        showQRCode={showQRCode}
      />

      {/* 3D Card */}
      <div className="relative perspective-1000">
        <div
          ref={cardRef}
          className="relative w-full h-96 transform-style-preserve-3d transition-all duration-1000"
          style={{
            transform: `rotateY(${rotation}deg) ${isFlipped ? 'rotateX(180deg)' : ''}`,
          }}
        >
          {/* Front face */}
          <div className="absolute inset-0 backface-hidden">
            <div
              ref={floatingRef}
              className="w-full h-full bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl border-2 border-blue-200 shadow-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 50%, #e6f3ff 100%)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.1)'
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">CARTE GRISE NFT</div>
                  <div className="text-sm bg-white text-blue-600 px-2 py-1 rounded">
                    #{vehicleData.vin.slice(-6)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <VehicleInfoSection vehicleData={vehicleData} />
                  <TechnicalInfoSection vehicleData={vehicleData} />
                </div>
                
                <QRCodeSection showQRCode={showQRCode} />

                {/* Blockchain badge */}
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                    🔗 Oasis Sapphire
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back face */}
          <div className="absolute inset-0 backface-hidden transform-rotate-y-180">
            <div
              className="w-full h-full bg-gradient-to-br from-white via-green-50 to-green-100 rounded-xl border-2 border-green-200 shadow-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f0fff4 50%, #e6fffa 100%)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(34, 197, 94, 0.1)'
              }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">DONNÉES PRIVÉES</div>
                  <div className="text-sm bg-white text-green-600 px-2 py-1 rounded">
                    🔐 Confidentiel
                  </div>
                </div>
              </div>

              <PrivateDataSection 
                showPrivateData={showPrivateData} 
                onTogglePrivateData={onTogglePrivateData} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        showQRCode={showQRCode}
        vehicleData={vehicleData}
        onClose={() => setShowQRCode(false)}
      />

      {/* Subtle depth effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/10 to-transparent opacity-30"></div>
      </div>
    </div>
  );
};
