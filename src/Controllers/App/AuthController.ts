import User from "../../Models/UserModel";

class AuthController {
  static async signUp(req, res, next) {
    try {
      const name = req.body.name;

      const newUser = await User.create({
        name,
      });



    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;