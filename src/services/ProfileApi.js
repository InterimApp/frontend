const API_URL = "http://localhost:8080/api";

export const fetchProfile = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateProfile = async (userId, profileData) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const uploadCV = async (userId, file) => {
  const formData = new FormData();
  formData.append("cv", file);
  
  try {
    const response = await fetch(`${API_URL}/user/${userId}/cv`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to upload CV");
    }
    return await response.json();
  } catch (error) {
    console.error("Error uploading CV:", error);
    throw error;
  }
};