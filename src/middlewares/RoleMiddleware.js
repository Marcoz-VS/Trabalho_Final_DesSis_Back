export const Role = (...rolesPermitidos) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Não autenticado",
        });
      }

      if (!rolesPermitidos.includes(user.role)) {
        return res.status(403).json({
          success: false,
          message: "Acesso negado",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro na verificação de permissão",
      });
    }
  };
};