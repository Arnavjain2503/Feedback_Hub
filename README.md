# FeedbackHub

FeedbackHub is a full‑stack web application for collecting and managing user feedback. It supports two roles: **Admin** and **Feedback Giver**. Administrators can view and manage all feedback submissions, while feedback givers can submit feedback. The UI features a branded navbar with a custom logo, a polished landing page, a dedicated about page and role‑based navigation.

## Features

- **User Authentication** – Secure JWT-based authentication with password hashing.
- **Role‑based Access** – Choose Admin or Feedback Giver during sign‑up; Admins can view and manage all feedback, while givers can only submit.
- **Feedback Submission** – Rich form capturing feedback ID, name, email, subject, tools & services used, rating, category and content.
- **Admin Dashboard** – View, mark reviewed or delete feedback entries. Conditional rendering ensures only admins see this view.
- **Modern UI** – Built with Next.js and React, featuring a custom logo, hero sections and responsive design.
- **Persistent Storage** – MongoDB stores user credentials and feedback entries.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (version 15.4) with React.
- **Backend**: [Express.js](https://expressjs.com/) (version 5.1).
- **Database**: MongoDB with Mongoose.
- **Authentication**: JSON Web Tokens and bcrypt.

## Installation

1. Clone or extract the repository.
2. Navigate to the `backend` and `frontend` directories and run `npm install` in each to install dependencies. Ensure you have Node.js installed.
3. Create a `.env` file in `backend` based on `.env.example` and set:

   ```env
   MONGO_URI=<your MongoDB connection string>
   JWT_SECRET=<your secret key>
   ```

4. Start the backend server:

   ```bash
   node server.js
   ```

5. Start the frontend in development mode:

   ```bash
   npm run dev
   ```

   The frontend will run at `http://localhost:3000`.

### Production build

To generate an optimized production build of the frontend, run:

```bash
npm run build
npm start
```

This builds the Next.js app for production and starts a server that serves the prebuilt pages.

## Usage

- Visit the home page and sign up. Select your role (Admin or Feedback Giver).
- As a feedback giver, you can access the **Give Feedback** form and submit feedback.
- As an admin, you can access both **Give Feedback** and **All Feedback**. In **All Feedback** you can mark entries as reviewed or delete them.
- The About page provides information about the project and how to get in touch.

## Screenshots
| Operation                     | Screenshot                                |
|------------------------------|--------------------------------------------|
| ✅ About US        | ![Weather](Screenshots/Screenshot%20(65).png) |
| ✅ Home             | ![Weather](Screenshots/Screenshot%20(66).png) |
| ✅ Submit Feedback            | ![Error](Screenshots/Screenshot%20(67).png) |
| ✅ All Feedback          | ![Error](Screenshots/Screenshot%20(68).png) |
| ✅ Reviewed Feedback         | ![Error](Screenshots/Screenshot%20(69).png) |
| ✅ Feedback deleted              | ![Upload](Screenshots/Screenshot%20(70).png) |
| ✅ Logout           | ![Weather](Screenshots/Screenshot%20(64).png) |

## Contributing

Contributions are welcome! Fork the repository and open a pull request with your improvements.

## License

This project is licensed under the MIT License.