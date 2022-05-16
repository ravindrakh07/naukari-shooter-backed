import { Router } from "express";
import AuthRoutes from "./Admin/AuthRoutes";
import AuthRouter from "./App/AuthRouter";

class Routes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.app();
    this.admin();
  }

  app() {
    this.router.use('/app/auth', AuthRouter)
  }

  admin() {
    this.router.use('/admin/auth', AuthRoutes);
  }

}
export default new Routes().router;