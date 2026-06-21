

export const taskAssignTransformer =(req, res, next) => {

    if(req.body.assignTo) {
       req.body.assignTo = Number(
        req.body.assignTo
       );
    }
}