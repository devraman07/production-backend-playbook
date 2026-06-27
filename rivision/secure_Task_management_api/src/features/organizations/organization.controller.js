import { createOrganizationService } from "./organization.service.js";
import { createOrgTransformer } from "./organization.transformer.js";




export const createOrgController = async (req, res) => {
     try {
        const organizationData = createOrgTransformer(req.body);

     const result = await createOrganizationService(organizationData, req.user);

     if(!result.success) {
        return res.status(result.statusCode).json({
            success : false,
            message : result.message,
        });
     }

     return res.status(result.statusCode).json({
        success : true,
        organization : result.organization,
        message : result.message,
     })
     } catch (error) {
        console.log(error);
console.log(error.cause);
        return res.status(500).json({
            success : false,
            error : error.message,
            message : "error inside create org controller",
        });
     }
}