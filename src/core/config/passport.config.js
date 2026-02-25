import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import jwt from "passport-jwt";

import dotenv from "dotenv";
dotenv.config();

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

// Manager: contiene la logica
import UserManager from "../../managers/userManager.js";
const userManager = new UserManager();



const initializePassport = () => {

    ////////////////////////////////////
    /// CONFIGURACION CON LOCAL STRATEGY
    ////////////////////////////////////
    

    // Llama al manager para crear y registrar usuarios
    passport.use("register", new LocalStrategy(
        { usernameField: "email", passReqToCallback: true }, 
        async(req, username, password, done) => {
            try {
                const {first_name, last_name, age, cart, role} = req.body;
                const user = await userManager.createUser({first_name, last_name, email: username, age, password, cart, role});
                return done(null, user);
    
            } catch (error) {
                return done(null, false, { message: error.message, status: error.statusCode || 500});
            }
        }
    ));
    
    // Maneja autenticacion para loguear usuarios.
    passport.use("login", new LocalStrategy(
        {usernameField: "email"},
        async (username, password, done) => {
            try {
                const user = await userManager.loginUser({email: username, password});
                return done(null, user);
    
            } catch (error) {
                return done(null, false, { message: error.message, status: error.statusCode || 500 });
            }
        }
    ));


    /////////////////////////
    /// CONFIGURACION CON JWT
    /////////////////////////
    

    // Extrae los tokens desde el header
    const headerExtractor = (req) => {
        let token = null;
        if (!req || !req.headers || !req.headers.authorization) {
            return null;
        }
        if(req && req.headers){
            token = req.headers.authorization.split(' ')[1]
        }
        return token;
    }

    // Creacion de tokens para usuarios logueados.
    passport.use("jwt", new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromExtractors([headerExtractor]),
            secretOrKey: process.env.JWT_SECRET
        }, 
        async (jwt_payload, done) => {
            try {
                const user = await userManager.getUserById(jwt_payload.id);
                
                if (!user) {
                    return done(null, false);
                }
                
                return done(null, user);
    
            } catch (error) {
                return done(null, false, { message: error.message, status: error.statusCode || 500 });
            }
        }));
};


export default initializePassport;