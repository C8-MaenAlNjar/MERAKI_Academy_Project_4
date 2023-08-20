const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
require("./db");


const app = express();
const PORT = process.env.PORT 


const useRouter = require("./routes/user");
const addPost =require('./routes/post');
const roleRouter = require('./routes/role');


app.use(cors());
app.use(express.json());


app.use("/", useRouter);
app.use("/",addPost)
app.use('/',roleRouter)

const DB_URI = process.env.DATABASE_URI;
const SECRET = process.env.SECRET;


app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});