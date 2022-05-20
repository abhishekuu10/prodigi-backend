# prodigi-backend

get started:
- Clone the repo
- Run "npm i" or "npm install" to install dependencies
- Create or edit the existing .env file accordingly.
- Run "npm start" to run the project in development mode


packages used:

- bcrypt for password hashing
- cors for cross origin compatibility
- dotenv for environment variables
- express backend framework
- yup for server side form validation
- jsonwebtoken for authentication
- Sequelize object relational mapping for postgres queries
- nodemon as a dev dependencies for development

Innovative feature
- Made Role , Permission and RolePermission schema to make a fully  scalable project . Made a CheckPermission function to verify permission of every api end route except general routes (commented out initially to test routes easily) . 
- Every User is given a default roleId=1 of a general user which can be changed by super admin user (once defined)

