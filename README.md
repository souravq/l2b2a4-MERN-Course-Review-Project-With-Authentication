# L2-B2-assignment-4 - Course Review With Auth

## Deployed Url - [https://l2b2a3-course-review-souravq.vercel.app/](https://l2b2a4-course-review-with-auth-souravq.vercel.app/)

## Postman API Documentation Link - [https://drive.google.com/file/d/1FXLuUR9a-_hPoK7jrOEGHgTM4ZHZrM2M/view](https://documenter.getpostman.com/view/17584701/2s9YsDjuRa)

## Description

L2-B2-assignment-4 Course Review with AUTH is a powerful TypeScript-based web application built with Express and Mongoose for MongoDB interaction. It provides a solid foundation for creating, reading, updating, and deleting User Data Registration, Login, Changing Passwords, course data, category data, and review data complete with robust validation and error handling.

### Features

-   **User Data:** Register User, Login User, Change Password
-   **CRUD Operations:** Perform Create, Read, Update, and Delete operations on Course data, Category Data and Review Data effortlessly.
-   **Express Framework:** Utilizes the Express web framework for building a robust and scalable backend.
-   **Mongoose ORM:** Seamlessly integrates with Mongoose, offering a convenient object modeling interface for MongoDB.
-   **Zod Validation:** Implements Zod for TypeScript-first schema declaration and validation, ensuring data integrity.
-   **bcrypt Security:** Leverages bcrypt for secure password hashing, enhancing user authentication.

## Prerequisites

Before running the application, ensure you have the following installed:

-   Node.js (v14 or higher)
-   MongoDB

## Installation

1.  Clone the repository.
    
    bashCopy code
    
    `[git clone https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-souravq.git](https://github.com/Porgramming-Hero-web-course/l2b2a4-course-review-with-auth-souravq.git)`
    
3.  Install dependencies.
    
    bashCopy code
    
    `npm install` 
    
4.  Create a `.env` file in the project root and add the following environment variables:
    
    envCopy code
    
    `MONGODB_URI=mongodb+srv://souravbera515:IW971Yb4IDdZTjTf@cluster0.ixzcz1z.mongodb.net/?retryWrites=true&w=majority`

    `JWT_ACCESS_SECRET = 3919f3cee8f7310c25f8da67784b9dd4371545c41aa994050e463f4ab933c27d`

    `BCRYPT_SALT_ROUNDS = 12`
    
    `PORT=3008` 
    

## Development

Run the following command to start the development server:

bashCopy code

`npm run dev` 

The server will be running at [http://localhost:3008](http://localhost:3008/) (or the port you specified in the `.env` file).

## Scripts

-   `npm run build`: Build the TypeScript code.
-   `npm test`: Run tests.
-   `npm run dev`: Start the development server with nodemon.
-   `npm run lint`: Lint the code.

## Dependencies

-   [Express](https://expressjs.com/): Web framework for Node.js.
-   [Mongoose](https://mongoosejs.com/): MongoDB object modeling for Node.js.
-   [bcrypt](https://www.npmjs.com/package/bcrypt): Library for hashing passwords.
-   [dotenv](https://www.npmjs.com/package/dotenv): Loads environment variables from a file.
-   [nodemon](https://nodemon.io/): Utility that monitors for changes and automatically restarts the server.
-   [zod](https://github.com/colinhacks/zod): TypeScript-first schema declaration and validation library.

## Here All are the API End Points - 

1) ### Register User -> http://localhost:3008/api/auth/register
2) ### Login User -> http://localhost:3008/api/auth/login
3) ### Change Password -> http://localhost:3008/api/auth/change-password
4) ### Create a Course -> http://localhost:3008/api/course
5) ### Get Paginated and Filtered Courses -> http://localhost:3008/api/courses?page=1&limit=10&tags=Design
6) ### Create a Category -> http://localhost:3008/api/categories
7) ### Get All Categories -> http://localhost:3008/api/categories
8) ### Create a Review -> http://localhost:3008/api/reviews
9) ### Update a Course (Partial Update with Dynamic Update) -> http://localhost:3008/api/courses/658ff40be32c6e064a8ec5b9
10) ### Get Course by ID with Reviews -> http://localhost:3008/api/courses/658ff40be32c6e064a8ec5b9/reviews
11) ### Get the Best Course Based on Average Review (Rating) -> http://localhost:3008/api/course/best
