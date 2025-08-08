const validate = (schemas) => {
  return (req, res, next) => {
    try {
      if (schemas.body) {
        const { error } = schemas.body.validate(req.body);
        if (error) {
          return res.status(400).json({
            success: false,
            message: error.details[0].message,
          });
        }
      }

      if (schemas.params) {
        const { error } = schemas.params.validate(req.params);
        if (error) {
          return res.status(400).json({
            success: false,
            message: error.details[0].message,
          });
        }
      }

      if (schemas.query) {
        const { error } = schemas.query.validate(req.query);
        if (error) {
          return res.status(400).json({
            success: false,
            message: error.details[0].message,
          });
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validate;
