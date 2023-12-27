# L2-B2-assignment-3 - Course Review

## Deployed Url - https://l2b2a3-course-review-souravq.vercel.app/

## Recorded Video Link - https://drive.google.com/file/d/1FXLuUR9a-_hPoK7jrOEGHgTM4ZHZrM2M/view

## Description

L2-B2-assignment-3 Course Review is a powerful TypeScript-based web application built with Express and Mongoose for MongoDB interaction. It provides a solid foundation for creating, reading, updating, and deleting course data, category data, review data complete with robust validation and error handling.

### Features

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
    
    `git clone https://github.com/Porgramming-Hero-web-course/l2b2a3-course-review-souravq.git`
    
3.  Install dependencies.
    
    bashCopy code
    
    `npm install` 
    
4.  Create a `.env` file in the project root and add the following environment variables:
    
    envCopy code
    
    `MONGODB_URI=mongodb+srv://souravbera515:LU3p049rSZnBBrVc@cluster0.im7ijnd.mongodb.net/?retryWrites=true&w=majority`
    
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

1) ### Create a Course -> http://localhost:3008/api/course
2) ### Get Paginated and Filtered Courses -> http://localhost:3008/api/courses?page=1&limit=10&tags=Design
3) ### Create a Category -> http://localhost:3008/api/categories
4) ### Get All Categories -> http://localhost:3008/api/categories
5) ### Create a Review -> http://localhost:3008/api/reviews
6) ### Update a Course (Partial Update with Dynamic Update) -> http://localhost:3008/api/courses/65848f3a7a2773e9c5945da5
7) ### Get Course by ID with Reviews -> http://localhost:3008/api/courses/65848f3a7a2773e9c5945da5/reviews
8) ### Get the Best Course Based on Average Review (Rating) -> http://localhost:3008/api/course/best
