import { Request, Response, NextFunction } from 'express'
import passport from 'passport';
import { BasicStrategy } from 'passport-http'
import { User } from '../models/User'

const notAuthorizedJson = { status: 401, message: "Não autorizado" }

passport.use(new BasicStrategy(async (email, senha, done) => {

    if (email && senha) {
        const user = await User.findOne({
            where: { email, senha }
        })
        if (user) {
            return done(null, user)
        }
    }
    return done(notAuthorizedJson, false);
}));

export const privateRoute = (req:Request, res:Response, next:NextFunction) => {
    passport.authenticate('basic', (err, user) => {
        req.user = user
        return user ? next() : next(notAuthorizedJson);
    })(req, res, next);
}

export { passport };