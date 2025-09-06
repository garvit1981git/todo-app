import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import About from "./components/about.jsx";
import Contextprovider from "./store/context.jsx";
import Handle from "./components/handle.jsx";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
let route = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      { path: "/", element: <Handle></Handle> },
      { path: "/about", element: <About></About> },
      { path: "/login", element: <Login></Login> },
      // { path: "/loginsub", element: <Login></Login> },
      { path: "/signup", element: <Signup></Signup> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Contextprovider>
    <RouterProvider router={route}></RouterProvider>
  </Contextprovider>
);

{
  /* <App />
   */
}

{
  /* HOW THIS WORKS 
    INSTALL react-router-dom IF NOT ALREADY DONE
FIRST: You create a router using createBrowserRouter and define your routes.
Then, you pass that router to the RouterProvider component, which makes the routing functionality available to your app.

 */
}
{
  /* The prop is always called router (fixed).
The value you pass into it (e.g. router, appRouter, myRoutes) is just a JavaScript variable — you can name it anything you want. */
}
