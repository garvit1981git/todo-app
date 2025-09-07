
import axios from "axios"

// post
// let posttodo = async (task, date) => {
//   let res = await fetch("http://localhost:3000", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       task, date
//     })
//   })
//   const data = await res.json();
//   console.log(data)
//   return data
// }
// get
// let gettodo = async () => {
//   let res = await fetch("http://localhost:3000")
//   let data = await res.json()
//   console.log(data)
//   return data
// }

// remove
// let removetodo = async (id) => {
//   let res = await fetch(`http://localhost:3000/${id}`, {
//     method: "DELETE",
//   }
//   )
//   let data = await res.json()
//   console.log(data)
//   return data
// }

let url = "https://todo-app-3-xeaf.onrender.com"
let posttodo = async (task, date) => {
  let res = await axios.post(url, { task, date }, { withCredentials: true })
  console.log("post", res)
  console.log("postdata", res.data)
  return res.data
}


let gettodo = async () => {
  let res = await axios.get(`${url}/todos`, { withCredentials: true });
  // console.log("get", res)
  console.log(res)
  return res
}

let removetodo = async (id) => {
  let res = await axios.delete(`${url}/${id}`, { withCredentials: true })
  // console.log("delete", res)  
  return res.data
}

// POST SESSION


let postlogin = async (loginpass, loginemail) => {
  let res = await axios.post(`${url}/postlogin`, {
    loginpass, loginemail
  }, { withCredentials: true })
  console.log("post session", res)
  return res
}


let postremovesession = async () => {
  let res = await axios.post(`${url}/loginrem`, {},                                // empty body
    { withCredentials: true })
  console.log("post session", res)
  return res
}




let registeruser = async (name, email, password) => {
  let res = await axios.post(`${url}/signup`, { name, email, password }, { withCredentials: true })
  console.log("register user", res)
  return res
}
export { gettodo }
export { posttodo }
export { removetodo }
export { postlogin }
export { postremovesession }
export { registeruser }
// export { remove }
// export { get }