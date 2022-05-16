import { Router } from "express";
import AuthController from "../../Controllers/App/AuthController";


class AuthRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.patchRoutes();
    }

    postRoutes() {
      this.router.post(
        '/sign-up',
        AuthController.signUp
      )
    }

    patchRoutes() {
    }
}

export default new AuthRouter().router;