const authService = require("../services/authService");

const authController = {

    async register(req, res) {
  try {
    const usuario = await authService.register(req.body);
    return res.json({ message: "Usuario registrado", usuario });
  } catch (error) {
    console.error("Error en registro:", error);

    if (error.code === "P2002") {
      return res.status(400).json({
        error: "Error al registrar el usuario",
        detalles: "Correo ya registrado"
      });
    }

    return res.status(500).json({
      error: "Error en el servidor"
    });
  }
},

    async login(req, res) {
        try {
            const usuarioLogeado = await authService.login(req.body);
            return res.json(usuarioLogeado);

        } catch (error) {
            return res.status(500).json({ error: "Error en login" });
        }
    },

    async prueba(req, res) {
        return res.json("este es un mensaje de prueba");
    }
};

module.exports = authController;
