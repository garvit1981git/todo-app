
// import session from "express-session"
// import MongoStore from "connect-mongodb-session"
import express, { urlencoded } from "express"
import dotenv from "dotenv"
dotenv.config()
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
import cors from "cors"
import mongoose from "mongoose"
import todoitemrouter from "./routes/todoitem.js";
import cookieParser from "cookie-parser";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const MongoDBStoreSession = MongoStore(session); // 👈 function call with session
// const store = new MongoDBStoreSession({
//   uri: url,
//   collection: "todoappsession",     // collection name in Mongo
// });

let app = express()
app.set("trust proxy", 1);
const PORT = process.env.PORT || 3000;
// app.use(session({
//   secret: "this is toido",
//   resave: false,
//   saveUninitialized: true,
//   store: store
// }))

app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', "https://todo-app-4-73e1.onrender.com"],
  credentials: true
}));
app.use(express.static("dist"))
app.use(urlencoded({ extended: true }))
app.use(express.json())
app.use(todoitemrouter)
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("sucsesfully connedcted to mongoose")
  app.listen(PORT, () => {

    console.log("server started at http://localhost:3000/ hello  eferf")
  })
}
).catch((err) => {
  console.log("error while connecting", err)
})
