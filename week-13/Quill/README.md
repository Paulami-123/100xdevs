## Quill

Quill is a blogging website where you can sign up to create and read blogs


**Backend**
It contains the user & blog routes. It is deployed on Cloudflare & created using hono instead of express

User Routes

 - /signup : To sign up new users
 - /signin  : To sign in existing users
 - /update : To update info of existing users
 - /delete   : To delete user account

Blog Routes

- / : To create new blogs & update existing blogs
- /bulk : To get published blogs by all users
- /myblogs : To get all blogs by the user (Even the drafts)
- /delete/all : To delete all blogs of a specific user (Used while deleting account)
- /:id : To get a specific blog data
- /delete/:id : To delete a specific blog

*******

**Common**
- It contains the schema of different input types. It is deployed on npm. 
- Use `@paulami/medium-common` package to access the same

*******

**Frontend**
It provides an interactive UI to make blogging a comfortable experience.