# hash_data.py

import hashlib
import json
from data import car_data_dict  # Import the dictionary from data.py

def hash_car_data(nft_token):
    """
    Compute a SHA256 hash of the car data for a given NFT token.
    """
    car_data = car_data_dict.get(nft_token)
    if car_data is None:
        raise ValueError(f"No data found for NFT token {nft_token}")

    # Prepare a dictionary of all relevant data fields
    data_dict = {
        'nft_token': car_data.nft_token,
        'name': car_data.name,
        'vin': car_data.vin,
        'history': car_data.history,
        'location': car_data.location,
        'address': car_data.address,
        'car_model': car_data.car_model,
        'years_licensed': car_data.years_licensed,
        'violations': car_data.violations,
        'claims': car_data.claims
    }

    # Convert the dictionary to a JSON string with sorted keys for consistency
    json_data = json.dumps(data_dict, sort_keys=True)

    # Compute the SHA256 hash of the JSON string
    hash_object = hashlib.sha256(json_data.encode('utf-8'))
    return hash_object.hexdigest()

# Example: hash the data for both NFT tokens
if __name__ == "__main__":
    for nft_token in car_data_dict:
        print(f"Hash for {nft_token}: {hash_car_data(nft_token)}")
