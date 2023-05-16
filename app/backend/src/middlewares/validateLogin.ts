import { NextFunction, Request, Response } from 'express';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  // regex: https://horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!regex.test(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validateLogin;
