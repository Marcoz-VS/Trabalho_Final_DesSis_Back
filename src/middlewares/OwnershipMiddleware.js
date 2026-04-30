export const Ownership = (policy, getResourceId) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      const resourceId = getResourceId(req);

      if (resourceId === undefined || resourceId === null) {
        return res.status(400).json({
          success: false,
          message: "Recurso não informado",
        });
      }

      const allowed = await policy(user, resourceId);

      if (!allowed) {
        return res.status(403).json({
          success: false,
          message: "Acesso negado",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Erro ao verificar permissão",
        error: error.message,
      });
    }
  };
};
