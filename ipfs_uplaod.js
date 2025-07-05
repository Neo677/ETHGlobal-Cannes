const fs = require('fs');
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxZGEwN2FhZC03NTU0LTRlMTktYTYwNy0wYjM4N2U0NDcwOTgiLCJlbWFpbCI6Imtob3Vhcy5pZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiODZlYjk0NGM4YTQ1YWYwYjY4ZDIiLCJzY29wZWRLZXlTZWNyZXQiOiJlZTU0NjQyNjk2NDAwNTE1YzFjODA3ODlhZWVlYTA0Njc2ODFiM2ExYjlmZjFlMWYwYjc0Y2I2NjlmMDE5MWI4IiwiZXhwIjoxNzgzMjc2NDcyfQ.EY7W1BHTyZltHR6HwG94hlOhtt-xP3UvHGwdVnB_51w' });

// Read JSON data from file
const carMetadata = JSON.parse(fs.readFileSync('car_data.json', 'utf8'));

async function upload() {
  try {
    const res = await pinata.pinJSONToIPFS(carMetadata);
    console.log('IPFS Hash:', res.IpfsHash);
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
  }
}

upload();
