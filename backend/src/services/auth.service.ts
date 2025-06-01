import { ApiError } from '../middlewares/error.middleware';
import User from '../models/user.model';

class AuthService {
  public async createUser(data: any) {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email }).lean().exec();
    if (existingUser) {
      throw new ApiError(400, 'User already exists');
    }

    const newUser = new User({ name, email, password });
    return await newUser.save();
  }

   public async loginUser(data: { email: string; password: string }) {
    const { email, password } = data;

    const user = await User.findOne({ email }).lean().exec();
    if (!user) {
      throw new ApiError(400, 'User not found');
    }

    if (user.password !== password) {
      throw new ApiError(400, 'Invalid credentials');
    }

    return user;
  }

}

export default AuthService;
