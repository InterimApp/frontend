const API_BASE = 'http://localhost:8080/api/contracts';

export const fetchUserContracts = async () => {
  const response = await fetch(`${API_BASE}/`);
  if (!response.ok) throw new Error('Failed to fetch contracts');
  return await response.json();
};

export const fetchContractDetails = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) throw new Error('Failed to fetch contract details');
  return await response.json();
};

export const signContract = async (contractId, signatureData) => {
  const response = await fetch(`${API_BASE}/${contractId}/sign`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ signature: signatureData })
  });
  if (!response.ok) throw new Error('Failed to sign contract');
  return await response.json();
};

export const downloadContract = async (id) => {
  const response = await fetch(`${API_BASE}/${id}/download`);
  if (!response.ok) throw new Error('Failed to get download URL');
  const data = await response.json();
  return data.data.downloadUrl;
};