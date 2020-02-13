const roleChecker = (allowedRoles = []) => (request, response, next) => {
  const { user: { role = '' } } = request;
  if (allowedRoles.includes(role)) {
    next();
  }
  response.status(401).send({
    message: `Required permissions are: ${allowedRoles.join(',')}`,
  });
};

module.exports = {
  roleChecker,
};
