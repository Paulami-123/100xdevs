import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinSchema, signupSchema, updateUserSchema } from "@paulami/medium-common";
import { middleware } from "../middleware";

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
    Variables : {
      userId : string
    }
}>();

userRouter.post('/signup', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const { success } = signupSchema.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error : "Invalid credentials"
    })
  }
  const existingUser = await prisma.user.findFirst({
    where : {
      email: body.email
    }
  });
  if(existingUser){
    c.status(411);
    return c.json({
      error: "User already exists"
    })
  }

  try{
    const response = await prisma.user.create({
      data : {
        email: body.email,
        password : body.password,
        name : body.name
      },
    });
  
    const token = await sign({id: response.id, name : response.name}, c.env.JWT_SECRET);
  
    return c.json({
      message: "Sign Up successful",
      token: token
    });
  }
  catch(err){
    console.log("Error: ", err);
  }
})

userRouter.post('/signin', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinSchema.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error : "Invalid credentials"
    });
  }

  try{
    const response = await prisma.user.findFirst({
      where: {
        email : body.email,
        password : body.password
      },
      select : {
        id : true,
        name : true
      }
    });
    if(!response){
      c.status(403);
      return c.json({
        error : "Incorrect credentials"
      })
    }
    const token = await sign({id: response.id, name : response.name}, c.env.JWT_SECRET);
    return c.json({
      message: "Sign In successful",
      token: token
    });
  }
  catch(err){
    c.status(403)
    return c.json({
      error: "Error while signing in"
    })
  }
})

userRouter.put('/update', middleware, async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body.prevPassword)
  const { success } = updateUserSchema.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      error : "Invalid credentials"
    });
  }

  const id = c.get('userId');
  try{
    await prisma.user.update({
      where: {
        id: id,
        password : body.prevPassword
      },
      data : {
        name: body.name!==null && body.name!=="" ? body.name : undefined,
        password : body.newPassword!==null && body.newPassword!==""  ? body.newPassword : undefined,
        about : body.about!==null && body.about!==""  ? body.about : undefined
      }
    })
    if(body.name){
      const token = await sign({id: id, name : body.name}, c.env.JWT_SECRET);
      return c.json({
        token : token
      })
    }
    return c.json({
      message : "User information updated"
    })
    }
  catch(err){
    c.status(411);
    return c.json({
      error : "Error while updating information"
    })
  }
})

userRouter.delete('/delete', middleware, async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get('userId');
  const sentPassword = body.password;

  try{
    const response = await prisma.$transaction([
      prisma.posts.deleteMany({
        where: {
          authorId : userId
        }
      }),
      prisma.user.delete({
        where : {
          id : userId,
          password : sentPassword
        }
      })
    ])
    return c.json({
      message : "User data deleted",
      response : response
    })
  }
  catch(err){
    c.status(411);
    const userPassword = prisma.user.findFirst({
      where : {
        id : userId
      },
      select : {
        password : true
      }
    });
    if(!userPassword){
      return c.json({
        error : "User does not exist"
      })
    }
    else if(userPassword!=sentPassword){
      return c.json({
        error : "Incorrect Password"
      })
    }
    else{
      return c.json({
        error : "Error while deleting information"
      })
    }
  }
})