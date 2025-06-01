import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';

class AuthRoutes {
  public router: Router;
  private authController = new AuthController();

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  private routes() {
    this.router.post('/signup', this.authController.signupUser);
    this.router.post('/login', this.authController.loginUser);
  }
}

export default AuthRoutes;
