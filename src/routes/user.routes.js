import { Router } from 'express';

const router = Router();

router.get("/usuarios", (req,res) => {
    res.send("Obteniendo listado de usuarios");
});


export default router;