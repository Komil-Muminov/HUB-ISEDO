import { OrganizationScheme } from "./OrganizationScheme";

const API = "http://localhost:3001";

export const createOrganization = async (formData: FormData) => {
  try {
    const response = await fetch(`${API}/organizations`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Ошибка в запросе createOrganization");
    }
    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
};
