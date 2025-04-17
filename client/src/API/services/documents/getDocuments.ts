const API = "http://localhost:3001";

export const getDocuments = async () => {
  try {
    const response = await fetch(`${API}/documents`);
    if (!response.ok) {
      throw new Error("Ошибка в запросе getDocuments");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
