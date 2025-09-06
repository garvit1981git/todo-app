import express from "express"
let todoitemrouter = express.Router()
import { posttodo, gettodos, removetodo, postlogin, postremovesession, registerusercontroller, authmiddleware } from "../controller/todoitemcontroller.js"
todoitemrouter.post("/",authmiddleware,  posttodo)
todoitemrouter.post("/postlogin", postlogin)
todoitemrouter.post("/loginrem", postremovesession)
todoitemrouter.get("/todos", authmiddleware , gettodos)
todoitemrouter.post("/signup", registerusercontroller)
todoitemrouter.delete("/:id", removetodo)
export default todoitemrouter