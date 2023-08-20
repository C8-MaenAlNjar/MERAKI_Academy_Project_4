const authorization = (requiredPermission) => {
    return (req, res, next) => {
        const userPermissions = req.token?.role?.permissions || [];
     
  
      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({
          success: false,
          message: `Unauthorized`,
        });
      }
      next();
    };
  };
  
  module.exports = authorization;
  
  

