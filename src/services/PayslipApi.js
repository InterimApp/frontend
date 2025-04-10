const API_URL = "http://localhost:8080/api/payslips";

export const fetchUserPayslips = async (userId) => {
  try {
    console.log(`Fetching payslips for user ${userId}`);
    const response = await fetch(`${API_URL}/user/${userId}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch payslips');
    }

    const responseData = await response.json();
    console.log('API response data:', responseData); // Debug log
    
    // Ensure we're returning the data array directly
    return responseData.data || [];
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const fetchPayslipDetails = async (payslipId) => {
  const response = await fetch(`${API_URL}/${payslipId}`);
  if (!response.ok) throw new Error("Failed to fetch payslip details");
  const responseData = await response.json();
  return responseData.data; // Access the data property directly
};

export const downloadPayslip = async (payslipId) => {
  try {
    console.log(`Requesting download URL for payslip ${payslipId}`);
    const response = await fetch(`${API_URL}/download/${payslipId}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to get download URL");
    }

    const result = await response.json();
    
    // For direct download
    if (response.headers.get('content-type')?.includes('application/pdf')) {
      return response;
    }
    
    // For Firebase URL
    return result.data?.downloadUrl;
  } catch (error) {
    console.error("Download API error:", error);
    throw error;
  }
};