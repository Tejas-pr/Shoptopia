# Shoptopia

Shoptopia is an e-commerce platform where users can browse, add, and view products. It includes optimized backend and frontend features to provide a seamless and secure shopping experience, including user authentication, password hashing, and image storage with AWS. An admin panel is available for managing products efficiently.

Check out the live version of the application [here](https://shoptopia-frontend.vercel.app/) to explore its features.

## Features

- **User Authentication**: JWT-based authentication to secure user data and link items added to the specific user.
- **Password Security**: Passwords are hashed using bcrypt, making it difficult to decrypt even if the database is compromised.
- **Image Storage**: AWS S3 is used to store product images efficiently.
- **Optimized Backend**:
  - **Rate Limiting**: Limited to 100 requests on AWS and a 2MB upload limit to reduce potential traffic bottlenecks.
  - **Validation**: Zod validation for input sanitization and error handling.
  - **Error Handling**: Comprehensive `try-catch` blocks implemented for stability.
- **Admin Panel**: Manage products with add and view functionalities through a dedicated admin interface.
- **Frontend Optimizations**:
  - Debouncing on the login page inputs to reduce unnecessary re-renders.
  - Context API and Recoil for state management.
  - Framer Motion for smooth animations.
  - Gsap for Pre-loader animation.

## Tech Stack

### Backend

- **[Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)**
- **[Express](https://expressjs.com/en/starter/basic-routing.html)**
- **[MongoDB (Mongoose)](https://mongoosejs.com/docs/)**
- **[AWS S3](https://aws.amazon.com/s3/)**
- **[bcrypt](https://www.npmjs.com/package/bcrypt)**
- **[JSON Web Token (JWT)](https://jwt.io/introduction/)**
- **[Zod](https://zod.dev/)**
- **[Multer](https://www.npmjs.com/package/multer)**
- **[Multer-S3](https://www.npmjs.com/package/multer-s3)**

### Frontend

- **[React](https://react.dev/)**
- **[React-icons](https://react-icons.github.io/react-icons/)**
- **[React-router-dom](https://reactrouter.com/en/main)**
- **[React-toastify](https://fkhadra.github.io/react-toastify/introduction)**
- **[Context API](https://react.dev/reference/react/useContext)**
- **[Recoil](https://recoiljs.org/docs/introduction/getting-started)**
- **[use-local-storage](https://usehooks.com/useLocalStorage/)**
- **[Framer Motion](https://www.framer.com/motion/)**
- **[GSAP/React](https://greensock.com/gsap/)**

## Installation

#### Clone the repository:

```bash
git clone https://github.com/yourusername/shoptopia.git
cd shoptopia
```

#### Backend Setup:

- Navigate to the backend directory:

  ```bash
    cd backend
  ```

- Install backend dependencies:

  ```bash
  npm install
  ```

- Configure environment variables in a `.env` file:

  ```plaintext
  MONGO_URI=your-mongo-uri
  JWT_SECRET=YOUR_TOKEN
  PORT=3000
  SALT_ROUNDS=YOUR_VALUE
  AWS_ACCESS_KEY_ID=your-access-key-id
  AWS_SECRET_ACCESS_KEY=your-secret-access-key
  AWS_REGION=your-region
  S3_BUCKET_NAME=your-bucket-name
  ```

- Start the backend server:

  ```bash
  npm start
  ```

#### Frontend Setup:

- Navigate to the frontend directory:

  ```bash
    cd ../frontend
  ```

- Install frontend dependencies:

  ```bash
    npm install
  ```

- Start the frontend server:

  ```bash
    npm run dev
  ```

## Optimization Details

- Rate Limiting: AWS limited to 100 requests and 2MB upload size to control traffic.
- Validation: Zod is used to validate incoming data, ensuring secure and correct data flow.
- Error Handling: Comprehensive try-catch blocks for stable operations.
- Password Security: bcrypt is used to hash passwords, adding a layer of security in case of database breaches.
- Frontend Debouncing: Applied on the login page to reduce unnecessary re-renders and improve performance.

## Deployment

- Frontend: Deployed on Vercel, making it accessible at https://shoptopia-frontend.vercel.app/.
- Backend: Host your backend on a service like Railway, Heroku, AWS, or DigitalOcean, or use your own server to ensure reliable API access.

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome.

## Connect with Me

I'm Tejas P R, and I'm always open to collaboration or full-time roles where I can contribute and grow. Connect with me if you're looking for a dedicated developer to join your team!

- [**GitHub**](https://github.com/Tejas-pr)
- [**LinkedIn**](https://www.linkedin.com/in/tejas-p-r-057a4622a/)
- [**Twitter**](https://x.com/tejas67061437)
- [**Email ( tejas.teju02@gmail.com )**](mailto:tejas.teju02@gmail.com)

### Thank you! 👋
