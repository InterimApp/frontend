const API_URL = "http://localhost:8080/api/payslips";

export const fetchUserPayslips = async (userId) => {
  const response = await fetch(`${API_URL}/user/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch payslips");
  return await response.json();
};

export const fetchPayslipDetails = async (payslipId) => {
  const response = await fetch(`${API_URL}/${payslipId}`);
  if (!response.ok) throw new Error("Failed to fetch payslip details");
  return await response.json();
};

export const downloadPayslip = async (payslipId) => {
  const response = await fetch(`${API_URL}/download/${payslipId}`);
  if (!response.ok) throw new Error("Failed to get download URL");
  const result = await response.json();
  return result.data.downloadUrl;
};