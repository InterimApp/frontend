const API_URL = "http://localhost:8080/api";

export const submitReport = async (reportData, token) => {
  try {
    const response = await fetch(`${API_URL}/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(reportData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Échec de la soumission du rapport");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchUserReports = async (userId, token) => {
  try {
    const response = await fetch(`${API_URL}/reports/user/${userId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Échec de la récupération des rapports");
    }
    
    const responseData = await response.json();
    return responseData.data; // Access the data property directly
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};