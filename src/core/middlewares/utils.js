import passport from "passport";

// Funcion para mandar mensajes de error y status personalizados desde las estrategias de passport.
export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if (err) {
                return res.status(500).json({ error: "Error interno del servidor" });
            }
            if (!user) {
                return res.status(info?.status || 401).json({
                    error: info?.message || "Error de autenticación"
                });
            }
            req.user = user;
            next();
        })(req, res, next);
    }
};