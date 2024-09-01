import { createMiddleware } from "hono/factory";
import { verify } from 'hono/jwt';

export const middleware = createMiddleware(async (c, next) => {
    const authHeader = c.req.header("authorization")||"";
    if(!authHeader){
        c.status(401);
        return c.json({
            error: "Unauthorised Request"
        })
    }
    const token = authHeader.split(' ')[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if(!payload){
        c.status(403);
        return c.json({
            error: "User not logged in"
        })
    }
    c.set('userId', String(payload.id));
    await next();
})