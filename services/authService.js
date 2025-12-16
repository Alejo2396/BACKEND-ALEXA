const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const Prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const SECRET = "clave_secreta_para_jwt";

const authService = {

    async register(data) {
        const { nombre, email, password } = data;

        // Verificar si el correo ya existe
        const existe = await Prisma.usuario.findFirst({
            where: { email }
        });

        if (existe) {
            // Lo captura el controller
            const error = new Error("Correo ya registrado");
            error.code = "P2002";
            throw error;
        }

        // Encriptar contraseña
        const datoencriptado = await bcrypt.hash(password, 10);

        // Crear usuario
        const usuario = await Prisma.usuario.create({
            data: {
                nombre,
                email,
                password: datoencriptado
            }
        });

        return usuario;
    },

    async login(data) {
        const { email, password } = data;

        const usuarioEncontrado = await Prisma.usuario.findFirst({
            where: { email }
        });

        if (!usuarioEncontrado) {
            return { msj: "El usuario no existe" };
        }

        const esCorrecta = await bcrypt.compare(password, usuarioEncontrado.password);

        if (!esCorrecta) {
            return { msj: "Contraseña incorrecta" };
        }

        const token = jwt.sign(
            {
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                email: usuarioEncontrado.email
            },
            SECRET,
            { expiresIn: "1h" }
        );

        return { usuario: usuarioEncontrado, token };
    },

    async logout() {
        return { msj: "Logout no requiere backend con JWT" };
    }
};

module.exports = authService;
