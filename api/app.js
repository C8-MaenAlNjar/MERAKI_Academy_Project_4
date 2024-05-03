import express from "express";
import postRoute from "./routes/post.js";
import userRoute from "./routes/user.js";
import commentRouter from "./routes/comments.js";
import likeRouter from "./routes/likes.js";
import chatRouter from "./routes/chat.js";
import messageRouter from "./routes/Message.js";

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "https://reliable-sopapillas-d0f3c7.netlify.app",
  credentials: true, 
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//Router

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
