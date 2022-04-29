import * as Bcrypt from "bcrypt";
import * as Jwt from "jsonwebtoken";

import { env } from "../Environments/Env";

export class Auth {
    public MAX_TOKEN_TIME = 600000;
    static generateVerificationCode(size: number = 4): string {
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < size; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    }

    static decodeJwt(token) {
        return new Promise((resolve, reject) => {
            Jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(data);
                }
            })
        });
    }

    static async getToken(data, expiresIn, next) {
        try {
            return Jwt.sign(
                data,
                env().jwtSecret,
                {
                    expiresIn
                }
            );
        } catch (err) {
            return next(err)
        }
    }


    static async comparePassword(candidatePassword: string, userPassword: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(candidatePassword, userPassword, ((err, isSame) => {
                if (err) {
                    reject(err);
                } else if (!isSame) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            }));
        });

    }

    static encryptPassword(password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }

            });

        });
    }


}