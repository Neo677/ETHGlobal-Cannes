# insurance_pricing.py

# Import the CarData class and car_data_dict from data.py
from data import CarData, car_data_dict

def calculate_insurance_price(nft_token):
    """
    Calculate the insurance premium based on car and driver data, accessed by NFT token.

    Args:
        nft_token (str): The NFT token identifier for the car.

    Returns:
        float: The calculated annual insurance premium.
    """
    # Retrieve the CarData object using the NFT token
    car_data = car_data_dict.get(nft_token)
    if car_data is None:
        raise ValueError(f"Data for NFT token {nft_token} not found.")

    # 1. Start with a base premium
    base_premium = 500.0  # USD, example starting point

    # 2. Adjust for driving experience and violations
    years_licensed = car_data.years_licensed
    violations = car_data.violations
    claims = car_data.claims

    if years_licensed < 2:
        base_premium *= 1.5   # Inexperienced driver
    elif years_licensed < 5:
        base_premium *= 1.2

    base_premium *= (1 + 0.15 * violations)   # Each violation increases premium by 15%
    base_premium *= (1 + 0.10 * claims)       # Each prior claim increases premium by 10%

    # 3. Adjust for car history
    accident_count = car_data.history.get('accident_count', 0)
    vehicle_type = car_data.history.get('vehicle_type', 'sedan')

    base_premium *= (1 + 0.20 * accident_count)  # Each accident increases premium by 20%

    # High-performance or luxury vehicles cost more to insure
    if vehicle_type in ['sports', 'luxury', 'SUV']:
        base_premium *= 1.5
    elif vehicle_type in ['truck', 'van']:
        base_premium *= 1.2

    # 4. Adjust for location risk
    high_risk_locations = ['NY', 'FL', 'CA', 'MI', 'NJ']
    if car_data.location in high_risk_locations:
        base_premium *= 1.4   # High-risk states

    # 5. Return the final calculated premium (rounded to nearest dollar)
    return round(base_premium, 2)

# Example usage
if __name__ == '__main__':
    # Choose an NFT token to test
    nft_token = 'NFT123456789'
    premium = calculate_insurance_price(nft_token)
    print(f"Calculated annual insurance premium for {nft_token}: ${premium}")

    nft_token2 = 'NFT987654321'
    premium2 = calculate_insurance_price(nft_token2)
    print(f"Calculated annual insurance premium for {nft_token2}: ${premium2}")
