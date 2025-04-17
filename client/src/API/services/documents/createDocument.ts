const API = "http://localhost:3001";

export const createDocument = async (formData: FormData) => {
  try {
    const response = await fetch(`${API}/documents`, {
      method: "POST",
      body: formData,
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Ошибка в запросе createDocument");
    }

    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
