const jwt = require("jsonwebtoken");

const SECRET = "clave_secreta_para_jwt";
const AuthMiddleware={                                                //si falla el next sique al siguiente middleware
    
    verificarToken(req, res, next){                                  //*req es lo que envio, res es lo que responde y next es para pasar de un endpoint a otro
        const token=req.headers['authorization'];                      //capturo el token del header
        if(!token){                                                //si no hay token 
            return res.json({error:"No se proporciono token"})       //retorno error
        }
        else{ //si hay token
            try {
               jwt.verify(token,SECRET);                     //verifico el token con la clave secreta
               next();                       //si todo esta bien paso al siguiente middleware o controlador
            } catch (error) {
                return res.json({error: "Token no válido"}) //si el token no es valido retorno error
            }
                                                               
        }
    }                   
}
module.exports = AuthMiddleware;