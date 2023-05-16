import * as jwt from 'jsonwebtoken';
import Login from '../interfaces/Login';

class JTW {
  private static secret: string = process.env.JWT_SECRET || 'senhasecreta';
  private static config: jwt.SignOptions = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };

  static generateToken(payload: Login): string {
    const token = jwt.sign(payload, this.secret, this.config);

    return token;
  }

  static decodedToken(token: string): Login {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET');
    return decoded as Login;
  }
}

export default JTW;
