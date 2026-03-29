
const authorize = (roles = []) => {
    return (req, res, next) => {
        try {
            // verificar que haya usuario
            if (!req.user) {
                return res.status(401).json({ error: "No autenticado" });
            }

            // verificar rol
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ error: "No autorizado" });
            }

            next();
        } catch (error) {
            res.status(500).json({ error: "Error en autorización" });
        }
    };
};

export default authorize;