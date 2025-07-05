from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding, rsa
import json

# Example: Generate a key pair (in practice, the insurance company provides their public key)
private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
public_key = private_key.public_key()

# Serialize public key for sharing (in real life, you'd get this from the insurance company)
public_pem = public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
)

# Example car data dictionary (replace with your real data)
data_dict = {
    'nft_token': 'NFT123456789',
    'name': 'John Doe',
    'vin': '1HGCM82633A004352',
    'history': {'accident_count': 1, 'vehicle_type': 'sedan'},
    'location': 'CA',
    'address': '1234 Elm Street, Some City, CA',
    'car_model': 'Honda Accord',
    'years_licensed': 2,
    'violations': 1,
    'claims': 0
}

# Convert data to JSON and encode to bytes
plaintext = json.dumps(data_dict, sort_keys=True).encode('utf-8')

# Encrypt the data with the insurance company's public key
ciphertext = public_key.encrypt(
    plaintext,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

# ciphertext can now be stored off-chain or sent to the insurance company

# --- On the insurance company's side (with the private key) ---

# Decrypt the data
decrypted = private_key.decrypt(
    ciphertext,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

# Convert back to dictionary
decrypted_data = json.loads(decrypted.decode('utf-8'))
print(decrypted_data)
