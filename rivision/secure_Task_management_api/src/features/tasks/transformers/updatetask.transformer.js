

export const updateTaskTransformer = (req, res, next) => {

    if (req.body.title) {
    req.body.title = req.body.title
      .trim()
      .replace(/\s+/g, " ");
  }

  if (req.body.description) {
    req.body.description = req.body.description
      .trim()
      .replace(/\s+/g, " ");
  }

  if (req.body.assignedTo) {
    req.body.assignedTo = Number(
      req.body.assignedTo
    );
  }

  next();
}