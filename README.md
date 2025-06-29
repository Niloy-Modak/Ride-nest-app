# Project Overview 
<h3>Website name: RideNest</h3>
The Car Rental Website is a full-featured web application that allows users to explore, book, and manage car rentals online. Designed for convenience and user engagement, the platform supports real-time booking, special offers, user authentication, and admin control.


## Live Demo

[Live Site URL](#) (https://b11-assingment11.web.app/)

## Features

- User authentication and authorization (firebase)
- CRUD operations on items (Create, Read, Update, Delete)
- Responsive UI/UX design
- MongoDB database interaction

## Technologies Used

- Backend: Node.js, Express.js
- Frontend: React.js
- Database: MongoDB (native deiver)
- Authentication: Firebase


## API Endpoints

### Product Endpoints

| Method | Endpoint                | Description                          | Access  |
|--------|-------------------------|--------------------------------------|---------|
| GET    | /all-vehicles           | Fetch all products                  | Public  |
| GET    | /vehicle/:id            | Fetch single product by ID          | Public  |
| POST   | /vehicles               | Add new product                     | User only  |
| PUT    | /vehicle/:id            | Update product by ID                | User only  |
| DELETE | /vehicle/:id            | Delete product by ID                | User only  |
| POST   | /rent-cars              | booking product by ID               | User only  |
| GET    | /booking-cars/:email    | Fetch users booking products        | User only |
| PUT    | /modify-booking/:id     | modifiy booking product by ID       | User only  |
| PUT    | /cancel-booking/:id     | cancel booking product by ID        | User only  |

## Installation

1. **Clone the repository:**
   ```bash
     https://github.com/Niloy-Modak/Ride-nest-app.git

2. **Navigate repository:**
   ```bash
   cd project
3. **Install dependencies:**
   ```bash
   npm install

4. **Set up environment variables:**
   ```bash
   PORT=3000
   MONGO_URI=your-mongodb-uri
5. **Run in client side:**
   ```bash
   npm run dev
6. **Run in server side:**
   ```bash
   nodemon index.js
