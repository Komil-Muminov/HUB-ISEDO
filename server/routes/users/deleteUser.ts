import { Request, Response } from "express";

const deleteUser = (req: Request, res: Response) => {
  res.json({
    message: `Пользователь по идентификатору ${req.params.id} удален`,
  });
};

export default deleteUser;
