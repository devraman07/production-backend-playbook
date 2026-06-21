

export const taskStatusTrasnformer = (req, res, next) => {
    if(req.body.status) {
        req.body.status = req.body.status.trim().toLowerCase();
    }

    next();
}