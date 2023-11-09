import z from 'zod';

const categoryValidation = z
    .object({
        name: z.string(),
        isActive: z.boolean(),
    })
    .required();

export default categoryValidation;
