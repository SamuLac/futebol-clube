import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { AuthReq } from '../middlewares/authentication';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);

    if (typeof token !== 'string') return res.status(401).json(token);

    return res.status(200).json({ token });
  }

  public static async loginRole(req: Request, res: Response) {
    const { email } = (req as AuthReq).auth;
    const role = await LoginService.getRole(email);
    if (typeof role !== 'string') return res.status(404).json(role);
    return res.status(200).json({ role });
  }
}
