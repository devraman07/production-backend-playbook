import { createOrganizationTransaction } from "./organization.transaction.js"

export const createOrganizationService = async (organizationData, user) => {
    const organization = await createOrganizationTransaction(organizationData, user);

    return {
        success : true,
        statusCode : 201,
        organization : organization,
        message : "organization created successfully",
    };
}