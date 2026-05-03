import jwt from "jsonwebtoken";

export const Auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token não fornecido",
      });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token inválido",
      });
    }

    const chaveSecreta = process.env.CHAVE_JWT;

    if (!chaveSecreta) {
      throw new Error("CHAVE_JWT não definida");
    }

    const decoded = jwt.verify(token, chaveSecreta);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      student: decoded.studentId ?? null,
      firstTime: decoded.firstTime,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token inválido ou expirado",
    });
  }
};
