export const hotelqueryTransformer = (req, res, next) => {
    if(req.query.page) {
        req.query.page = Number(req.query.page);
    }

    if(req.query.limit) {
        req.query.limit = Number(req.query.limit);
    }

    if(req.query.rating) {
        req.query.rating = Number(req.query.rating);
    }

    next();
}