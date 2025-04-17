const API = "http://localhost:3001";

export const getWorkingHours = async () => {
  try {
    const response = await fetch(`${API}/workingHours`);
    if (!response.ok) {
      throw new Error("Ошибка в запросе getWorkingHours");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
