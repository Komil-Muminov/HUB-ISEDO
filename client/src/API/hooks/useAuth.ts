import { LogmeProps } from "../services/users/logMe";
import { RegmeProps } from "../services/users/createUser";
export const useAuth = () => {
  const logMe = async (data: LogmeProps): Promise<void> => {
    return await fetch(`http://localhost:3001/users/logme`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res: Response) => {
        if (!res.ok) {
          throw Error;
        }
        return res.json();
      })
      .then((resData) => {
        localStorage.setItem("token", resData.token);
      });
  };

  const regMe = async (newUser: RegmeProps): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error(`Error on createUser`);
      }
      console.log(response);

      return response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return {
    logMe,
    regMe,
  };
};
