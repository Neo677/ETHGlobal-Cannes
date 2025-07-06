import React, { useState } from "react";
import { usePrivySelfProfile } from "@/hooks/usePrivySelfProfile";
import { usePrivySelf } from "@/providers/PrivySelfProvider";
import { PrivyService } from "@/services/blockchain/privyService";
import { ContractService } from "@/services/blockchain/contractService";
import { DataPrivacyService } from "@/services/blockchain/dataPrivacyService";

export const SellerMintForm: React.FC = () => {
  const { profile } = usePrivySelfProfile();
  const { account } = usePrivySelf();
  const [publicData, setPublicData] = useState({
    vin: "",
    brand: "",
    model: "",
    year: 2023,
    color: "",
    mileage: 0,
  });
  const [privateData, setPrivateData] = useState({
    notes: "",
    maintenance: "",
    purchasePrice: ""
  });
  const [log, setLog] = useState<string>("");
  const [loading, setLoading] = useState(false);

  if (!profile || (profile.role !== "seller" && profile.role !== "admin")) {
    return <div className="text-red-500">Access denied: Seller only</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: "public" | "private") => {
    const { name, value } = e.target;
    if (type === "public") setPublicData({ ...publicData, [name]: value });
    else setPrivateData({ ...privateData, [name]: value });
  };

  const handlePrepareMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLog("");
    try {
      // 1. Préparer les métadonnées publiques/privées
      const dataPrivacyService = DataPrivacyService.getInstance();
      const vehicleData = {
        ...publicData,
        ownerAddress: account || '',
        purchasePrice: privateData.purchasePrice,
        maintenanceHistory: [privateData.maintenance],
        insuranceDetails: "", // plus utilisé
        personalNotes: privateData.notes
      };
      const { publicTokenURI, secretMetadata } = await dataPrivacyService.prepareMintData(vehicleData);

      // 2. Préparer le mint (sans exécuter)
      const contractService = ContractService.getInstance();
      const result = await contractService.prepareMint(
        {
          ...publicData,
          tokenURI: publicTokenURI
        },
        account || ""
      );

      setLog(
        `Préparation réussie !\nSigner: ${result.signerAddress}\nContract: ${result.contract.address}\nTokenURI: ${publicTokenURI}\nSecretMetadata: ${secretMetadata}\nVehicleData: ${JSON.stringify(publicData)}`
      );
    } catch (error: any) {
      setLog("Erreur: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePrepareMint} className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Préparer le Mint d'un NFT Véhicule</h2>
      <div className="mb-4">
        <label className="block font-semibold">VIN</label>
        <input name="vin" value={publicData.vin} onChange={e => handleChange(e, "public")}
          className="border p-2 w-full" required />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Marque</label>
        <input name="brand" value={publicData.brand} onChange={e => handleChange(e, "public")}
          className="border p-2 w-full" required />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Modèle</label>
        <input name="model" value={publicData.model} onChange={e => handleChange(e, "public")}
          className="border p-2 w-full" required />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Année</label>
        <input name="year" type="number" value={publicData.year} onChange={e => handleChange(e, "public")}
          className="border p-2 w-full" required />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Couleur</label>
        <input name="color" value={publicData.color} onChange={e => handleChange(e, "public")}
          className="border p-2 w-full" required />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Kilométrage</label>
        <input name="mileage" type="number" value={publicData.mileage} onChange={e => handleChange(e, "public")}
          className="border p-2 w-full" required />
      </div>
      <hr className="my-6" />
      <h3 className="font-bold mb-2">Données Privées (chiffrées)</h3>
      <div className="mb-4">
        <label className="block font-semibold">Notes personnelles</label>
        <textarea name="notes" value={privateData.notes} onChange={e => handleChange(e, "private")}
          className="border p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Historique d'entretien</label>
        <input name="maintenance" value={privateData.maintenance} onChange={e => handleChange(e, "private")}
          className="border p-2 w-full" />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Prix d'achat</label>
        <input name="purchasePrice" value={privateData.purchasePrice} onChange={e => handleChange(e, "private")}
          className="border p-2 w-full" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Préparation..." : "Préparer Mint NFT"}
      </button>
      {log && <pre className="mt-4 bg-gray-100 p-2 rounded text-xs whitespace-pre-wrap">{log}</pre>}
    </form>
  );
};
