export const registerTransformer =
  (req, res, next) => {

    if (req.body.name) {
      req.body.name =
        req.body.name.trim();
    }

    if (req.body.email) {
      req.body.email =
        req.body.email
          .trim()
          .toLowerCase();
    }

    if (req.body.age) {
      req.body.age =
        Number(req.body.age);
    }

    next();
  };