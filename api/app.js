import express from "express";
import postRoute from "./routes/post.js";
import userRoute from "./routes/user.js";
import commentRouter from "./routes/comments.js";
import likeRouter from "./routes/likes.js";
import chatRouter from "./routes/chat.js";
import messageRouter from "./routes/Message.js";
import { config } from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Load environment variables
config({ path: ".env" });

// Define allowed origins
const allowedOrigins = [
  "https://melodious-kashata-228ce2.netlify.app",
  "http://localhost:5173",
];

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Session middleware
app.use(
  session({
    secret: process.env.JWT_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

// Enable CORS
app.use(cors(corsOptions));

// Other middleware
app.use(express.json());
app.use(cookieParser());

// Router
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRouter);
app.use("/like", likeRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.use("*", (req, res) =>
  res.status(404).json({ message: "Resource not found" })
);

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
