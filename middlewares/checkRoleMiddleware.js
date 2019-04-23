const allowToRoles = rolesNames => (req, res, next) => {
  const { user } = req;

  try {
      const rolesNamesToCheck = Array.isArray(rolesNames) ? rolesNames : [rolesNames];

      if (user.accountType && rolesNamesToCheck.includes(user.accountType)) {
          return next();
      }
      console.log('Role is not matches!');
      res.json({isSuccessfully: false, message: 'Access is denied'}); //where
  } catch (err) {
      console.log('err', err);
      return next(err);
  }
};

module.exports = {
  allowToRoles,
};
