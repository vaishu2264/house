import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Components/login';
import Register from './Components/Register';
import Home from './Components/Home';
import Tenantlogin from './Components/Tenantlogin';
import Ownerlogin from './Components/Ownerlogin';
//import Aboutus from './Components/Aboutus';
//import Contactus from './Components/contactus';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Register/>,
  },
  {
    path: "tenant",
    element: <Tenantlogin/>,
  },
  {
    path: "owner",
    element: <Ownerlogin/>,
  },
  // {
  //   path: "aboutus",
  //   element: <Aboutus/>,
  // },
  // {
  //   path: "contactus",
  //   element: <Contactus/>,
  // },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
      <RouterProvider router={router} />
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
