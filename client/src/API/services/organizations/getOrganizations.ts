const API = "http://localhost:3001";

export const getOrganizations = async () => {
  try {
    const response = await fetch(`${API}/organizations`);
    if (!response.ok) {
      throw new Error("Ошибка в запросе getOrganizations");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
