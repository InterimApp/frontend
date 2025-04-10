const API_URL = "http://localhost:8080/api";

export const fetchContracts = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/contracts?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch contracts');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const signContract = async (contractId, userId, signatureUrl) => {
  try {
    const response = await fetch(`${API_URL}/contracts/${contractId}/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        signatureUrl,
        userId,
        signed: true // Ensure this is set to true
      })
    });
    if (!response.ok) throw new Error('Failed to sign contract');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const downloadContract = async (contractId) => {
  try {
    const response = await fetch(`${API_URL}/contracts/${contractId}/download`);
    if (!response.ok) throw new Error('Failed to download contract');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
const uploadFile = async (file, fileType = 'image') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'signature_preset'); // Replace with your upload preset

    const endpoint =
      fileType === 'pdf'
        ? 'https://api.cloudinary.com/v1_1/dnju3nnf5/upload'
        : 'https://api.cloudinary.com/v1_1/dnju3nnf5/image/upload';

    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url; // Return the uploaded file URL
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export { uploadFile };