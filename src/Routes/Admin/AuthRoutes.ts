import { Router } from "express";


class AuthRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.postRoutes();
        this.patchRoutes();
    }

    postRoutes() {
    }

    patchRoutes() {
    }
}

export default new AuthRoutes().router;