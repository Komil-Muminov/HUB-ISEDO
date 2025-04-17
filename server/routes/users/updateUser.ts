import { Request, Response } from "express";

const updateUser = (req: Request, res: Response) => {
  res.json({
    message: `Пользователь по идентификатору ${req.params.id} обновлен`,
  });
};

export default updateUser;
