import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  private authService = new AuthService();

  public signupUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
      }

      const createdUser = await this.authService.createUser({ name, email, password });

      res.status(201).json({
        message: 'User signed up successfully',
        user: createdUser,
      });
    } catch (err: any) {
        next(err);
    }
  };

   public loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await this.authService.loginUser({ email, password });

      res.status(200).json({
        message: 'Login successful',
        user,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
