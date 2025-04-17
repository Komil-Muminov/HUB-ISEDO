const API = "http://localhost:3001";

interface IProps {
  workingHoursId: string;
  htmlContent: string;
}

export const updateWorkingHoursById = async (newData: IProps) => {
  try {
    const response = await fetch(
      `${API}/workingHours/${newData.workingHoursId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newData),
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка в запросе updateWorkingHoursById");
    }

    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
