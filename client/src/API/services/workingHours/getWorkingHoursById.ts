const API = "http://localhost:3001";

export const getWorkingHoursById = async (workingHoursId: string | number) => {
  try {
    const response = await fetch(`${API}/workingHours/${workingHoursId}`);
    if (!response.ok) {
      throw new Error("Ошибка в запросе getWorkingHoursById");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
