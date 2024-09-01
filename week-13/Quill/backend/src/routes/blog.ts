import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { createBlogSchema, updateBlogSchema } from "@paulami/medium-common";
import { middleware } from "../middleware";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use(middleware);

function getDate(){
    const day = new Date();
    const m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateString = m[day.getMonth()] + ' ' + day.getDate() + ', ' + day.getFullYear();
    return dateString
}

blogRouter.post('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createBlogSchema.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            error : "Invalid credentials"
        })
    }
    const authorId = c.get('userId');
    const createdAt = getDate()

    const blog_id = await prisma.posts.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
            published : body.published!==null ? body.published : undefined,
            createdAt : createdAt,
            editedAt : createdAt
        },
        select: {
            id: true
        }
    });

    return c.json({
        message: "Blog uploaded",
        blog_id: blog_id
    })
})

// pagination  
blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blogs = await prisma.posts.findMany({
        where : {
            published : true
        },
        include : {
            author : {
                select : {
                    name : true
                }
            }
        }
    });

    return c.json({
        blogs: blogs
    })
})

blogRouter.put('/', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateBlogSchema.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            error : "Invalid credentials"
        })
    }
    const authorId = c.get('userId');

    let blogData = await prisma.posts.findFirst({
        where : {
            id: body.id
        },
        select : {
            authorId : true
        }
    })
    if(!blogData){
        c.status(403);
        return c.json({
            error : "Incorrect ID"
        })
    }
    else if(blogData.authorId!==authorId){
        c.status(403);
        return c.json({
            error : "You cannot edit someone else's blog!"
        })
    }

    try{
        const editedAt = getDate();
        const response = await prisma.posts.update({
            where: {
                id: body.id
            },
            data: {
                title: (body.title!==null && body.title!=="")? body.title : undefined,
                content: body.content!==null && body.content!=="" ? body.content : undefined,
                published : body.published!==null ? body.published : undefined,
                editedAt : editedAt
            }
        });
    
        return c.json({
            message: "Blog updated",
            blog_id: body.id,
            response : response
        });
    }
    catch(err){
        c.status(403);
        return c.json("Error while updating blog");
    }
})

blogRouter.get('/myblogs', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const authorId = c.get('userId');

    try{
        const response = await prisma.posts.findMany({
            where : {
                authorId : authorId
            }, 
            include : {
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });
    
        return c.json({
            blogs : response
        })
    }
    catch(err){
        c.status(411);
        return c.json({
            error : "Error while fetching blogs",
            err : err
        })
    }
})

blogRouter.delete('/delete/all', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const authorId = c.get('userId');

    try{
        const response = await prisma.posts.deleteMany({
            where : {
                authorId : authorId
            }
        });
    
        return c.json({
            message : "All blogs deleted",
            response : response
        })
    }
    catch(err){
        c.status(411);
        return c.json({
            error : "Error while deleting blogs",
            err : err
        })
    }
})

blogRouter.get('/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const id = c.req.param('id');
    try{
        const blog = await prisma.posts.findFirst({
            where:{
                id: id
            },
            include : {
                author : {
                    select : {
                        name : true,
                        about : true
                    }
                }
            }
        });
        
        return c.json({
            blog: blog
        });
    }
    catch(err){
        c.status(411);
        return c.json({
            error : "Error while fetching blog"
        })
    }
})

blogRouter.delete('/delete/:id', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const authorId = c.get('userId');
    const id = c.req.param('id');

    const blogAuthor = await prisma.posts.findFirst({
        where : {
            id : id
        },
        select : {
            authorId : true
        }
    });

    if(!blogAuthor){
        c.status(403);
        return c.json({
            error : "Blog does not exist"
        })
    }
    else if(blogAuthor.authorId!==authorId){
        c.status(403);
        return c.json({
            error : "You cannot delete someone else's blog"
        })
    }

    try{
        const response = await prisma.posts.delete({
            where : {
                id : id,
                authorId : authorId
            }
        });
    
        return c.json({
            message : "Blog deleted",
            response : response
        })
    }
    catch(err){
        c.status(411);
        return c.json({
            error : "Error while deleting blog",
            err : err
        })
    }
})