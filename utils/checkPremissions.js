const UnAuthenticatedError = require("../errors/Unauthenticated");

const checkPermission = (requestUser, resourseUserId) => {
  if (requestUser.userId === resourseUserId.toString()) return;
  throw new UnAuthenticatedError("Not authorized to accses this route");
};

module.exports = checkPermission;
