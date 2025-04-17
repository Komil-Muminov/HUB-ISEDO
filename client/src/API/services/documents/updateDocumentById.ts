const API = "http://localhost:3001";

interface IProps {
  documentId: string;
  htmlContent: string;
}

export const updateDocumentById = async (newData: IProps) => {
  try {
    const response = await fetch(`${API}/documents/${newData.documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error("Ошибка в запросе updateDocumentById");
    }

    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
