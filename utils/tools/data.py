# data.py

# Define a class to store car information, identified by NFT token
class CarData:
    def __init__(self, nft_token, name, vin, history, location, address, car_model):
        self.nft_token = nft_token              # Unique NFT token identifier for the car
        self.name = name                        # Owner's name
        self.vin = vin                          # Vehicle Identification Number
        self.history = history                  # Dictionary: car history (e.g., accident count, vehicle type)
        self.location = location                # Car's primary location (e.g., state or ZIP)
        self.address = address                  # Owner's address
        self.car_model = car_model              # Car model (e.g., 'Honda Accord')

# Example data stored in a dictionary keyed by NFT token
car_data_dict = {
    'NFT123456789': CarData(
        nft_token='NFT123456789',
        name='John Doe',
        vin='1HGCM82633A004352',
        history={'accident_count': 1, 'vehicle_type': 'sedan'},
        location='CA',
        address='1234 Elm Street, Some City, CA',
        car_model='Honda Accord'
    ),
    'NFT987654321': CarData(
        nft_token='NFT987654321',
        name='Jane Smith',
        vin='2FTRX18W1XCA12345',
        history={'accident_count': 0, 'vehicle_type': 'SUV'},
        location='NY',
        address='5678 Oak Avenue, Another City, NY',
        car_model='Toyota RAV4'
    )
}

# You can now import car_data_dict and CarData in other files and access all info by NFT token.
