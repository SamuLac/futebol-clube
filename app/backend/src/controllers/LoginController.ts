import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);

    if (typeof token !== 'string') return res.status(401).json(token);

    return res.status(200).json({ token });
  }
}
