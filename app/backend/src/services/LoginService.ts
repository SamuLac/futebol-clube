import * as bcrypt from 'bcryptjs';
import JTW from '../utils/JTW';
import UserModel from '../database/models/UsersModel';

export default class LoginService {
  public static async login(email: string, password: string)
    : Promise <string | { message: string }> {
    const user = await UserModel.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { message: 'Invalid email or password' };
    }
    const { id } = user;
    const token = JTW.generateToken({ id, email, password });

    return token;
  }
}
