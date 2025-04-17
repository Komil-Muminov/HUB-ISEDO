const API = "http://localhost:3001";

export const getDocumentById = async (documentId: string | number) => {
  try {
    const response = await fetch(`${API}/documents/${documentId}`);
    if (!response.ok) {
      throw new Error("Ошибка в запросе getDocumentById");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
