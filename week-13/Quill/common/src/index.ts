import z from 'zod';

export const signupSchema = z.object({
  email : z.string().email(),
  password : z.string().min(7),
  name : z.string().min(3)
});

export const signinSchema = z.object({
    email : z.string().email(),
    password : z.string().min(7)
})

export const updateUserSchema = z.object({
    name : z.string().min(3).or(z.string().optional()),
    prevPassword : z.string().min(7),
    newPassword : z.string().min(7).or(z.string().optional()),
    about : z.string().optional()
})

export const createBlogSchema = z.object({
    title : z.string().min(3),
    content : z.string().min(3),
    published : z.boolean().optional()
})

export const updateBlogSchema = z.object({
    id : z.string(),
    title : z.string().min(3).optional(),
    content : z.string().min(3).optional(),
    published : z.boolean().optional()
})

export type SignUpInput = z.infer<typeof signupSchema>
export type SignInInput = z.infer<typeof signinSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type CreateBlogInput = z.infer<typeof createBlogSchema>
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>