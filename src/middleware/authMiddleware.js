import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "No posee autorización requerida."
        });
    }

    try {
        const payload = jwt.verify(token, "programacion-3-2026");

        req.user = payload;

        next();
    } catch (error) {
        return res.status(403).json({
            message: "No posee permisos correctos."
        });
    }
};


export const verifyRole = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({
                message: "No tenés permisos para realizar esta acción."
            });
        }

        next();
    };
};