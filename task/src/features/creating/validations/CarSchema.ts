import { z } from 'zod';

export const CarFormSchema = z.object({
    brand: z.string().nonempty('Brand is required'),
    type: z.string().nonempty('Type is required'),
    model: z.string().nonempty('Model is required'),
    year: z
        .string()
        .regex(/^\d{4}$/, 'Year must be a 4-digit number')
        .nonempty('Year is required'),
    img: z.string().url('Invalid image URL'),
    engine: z.string().nonempty('Engine is required'),
    price: z
        .string()
        .regex(/^\d+$/, 'Price must be a number')
        .nonempty('Price is required'),
});
