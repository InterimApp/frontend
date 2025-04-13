const uploadFile = async (file, fileType = 'image') => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'signature_preset'); // Change if needed
  
      const endpoint =
        fileType === 'pdf'
          ? 'https://api.cloudinary.com/v1_1/dnju3nnf5/upload'
          : 'https://api.cloudinary.com/v1_1/dnju3nnf5/image/upload';
  
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };
  
  export { uploadFile };
  