const API = "http://localhost:3001";

export const createWorkingHours = async (formData: FormData) => {
  try {
    const response = await fetch(`${API}/workingHours`, {
      method: "POST",
      body: formData,
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Ошибка в запросе createWorkingHours");
    }

    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
