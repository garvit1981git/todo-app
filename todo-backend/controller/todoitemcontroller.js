import Todo from "../model/todoitemmodel.js"
import Usermodel from "../model/usermodel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
// Rather than hard-coding this into your app, you define it in a .env file:
// PORT=3000
// JWT_SECRET=mySuperSecretKey
// Then in your code, you can access it like:
// process.env.PORT      // 3000
// process.env.JWT_SECRET // 'mySuperSecretKey'
// That’s where dotenv comes in — it loads them into process.env.


dotenv.config()
// Load environment variables from .env into process.env

import { check, validationResult } from "express-validator"
import Userschema from "../../../main/model/user.js"
let posttodo = (req, res) => {
  let userid = req.user._id
  // console.log("post", userid)
  let { task, date } = req.body
  // console.log(task, date)
  let todoitem = new Todo({
    task,
    date,
  })
  todoitem.save().then((docu) => {
    if (!docu) {
      res.status(201).json({ message: "error " })
    } else {
      Usermodel.findById(userid).then((curuser) => {
        console.log("user", curuser)
        curuser.todos.push(docu._id)
        curuser.save()
      })
      res.status(201).json(docu)
    }
  }).catch((err) => {
    res.status(500).json({ message: "error while adding item" })
  })
}
let gettodos = (req, res) => {
  // console.log(req.body)
  let id = req.user._id
  Usermodel.findById(id).populate("todos").then((user) => {
    // console.log(user)
    let todoarray = user.todos
    return res.status(200).json({ array: todoarray, state: req.user })
  })
  // Todo.find().then((items) => {
  //   res.status(200).json(items)
  // }).catch((err) => {
  //   res.status(500).json({ message: "error while getting items" })
  // })

}
let removetodo = (req, res) => {
  // console.log(req.body)
  let id = req.params.id
  Todo.findByIdAndDelete(id).then((document) => {
    if (!document) {
      console.log("no document found")
      res.status(200).json(({ message: "no document found" }))
    } else {

      console.log(document, document._id)
      res.status(200).json(({ id: document._id }))
    }
  })
}
let postlogin = async (req, res) => {
  try {
    let { loginpass, loginemail } = req.body;

    // 1. Find user
    let user = await Usermodel.findOne({ email: loginemail });
    if (!user) {
      return res.status(200).json({
        message: "user not found",
        route: "/signup",
        isloggedin: false
      });
    }

    // 2. Compare password
    let result = await bcrypt.compare(loginpass, user.hashedpassword);
    if (!result) {
      return res.status(200).json({
        message: "invalid credentials",
        isloggedin: false
      });
    }

    // 3. Create token
    let payload = {
      _id: user._id,
      isloggedin: true
    };

    let token;
    try {
      token = jwt.sign(payload, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT signing error:", err);
      return res.status(500).json({
        message: "Error generating token",
        isloggedin: false
      });
    }

    // 4. Set cookie
    res.cookie("Token", token, {
      httpOnly: true,
      secure: false,   // use true in production with HTTPS
      sameSite: "lax",
      path: "/"
    });

    // 5. Send response
    return res.status(200).json({
      message: "successfully logged in",
      token,
      isloggedin: true
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "Internal server error",
      isloggedin: false
    });
  }
};

let postremovesession = (req, res) => {
  console.log("in logout")
  res.clearCookie("Token", {
    httpOnly: true,
    secure: false,   // use true in production with HTTPS
    sameSite: "lax",
    path: "/"
  });
  res.status(200).json({ message: "logged out successfully", isloggedin: false })

}
let registerusercontroller = [
  check("name")
    .notEmpty()
    .withMessage("name cannot be empty"),

  check("email")
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("invalid email"),
  check("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),

  , async (req, res) => {
    let { name, email, password } = req.body
    let err = validationResult(req)
    if (!err.isEmpty()) {
      return res.status(200).json({ message: "validation error", errors: err.array().map(err => err.msg), route: "/signup" })
    }
    let hashedpassword = await bcrypt.hash(password, 10);
    console.log(req.body)
    console.log(hashedpassword)
    let user = await Usermodel.findOne({ email })
    if (user) {
      return res.status(200).json({ message: "user already exists", route: "/login" })
    }
    let newuser = new Usermodel({
      name, email, hashedpassword
    })
    newuser.save().then((doc) => {
      if (!doc) {
        console.log("error in registering user")
        return res.status(500).json({ message: "error in registering user" })
      }
      return res.status(200).json({ message: "user registered successfully", route: "/login", userid: doc._id })
    })
  }]
let authmiddleware = (req, res, next) => {
  let token = req.cookies.Token
  console.log(token)
  if (!token) {
    req.user = {
      isloggedin: false
    }
    return res.status(401).json({ message: "Not authenticated", state: req.user, array: [] });
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("data", decoded)
    req.user = decoded;
    // console.log("con user", req.user)
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
export { posttodo }
export { gettodos }
export { removetodo }
export { postlogin }
export { postremovesession }
export { registerusercontroller }
export { authmiddleware }