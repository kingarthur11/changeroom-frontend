import React, { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import Settings from "./component/Settings";
import ListCompany from "./component/ListCompany";
import ProtectedRoute, { NotProtectedRoute } from "./ProtectecRoute";
import { RouterProvider } from "react-router-dom";

import Dashboard from "./component/Home";

function ApiRoute({ isAuth }) {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: (
        <NotProtectedRoute isAuth={isAuth}>
          <Signup />
        </NotProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute isAuth={isAuth}>
          <Settings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/companies",
      element: (
        <ProtectedRoute isAuth={isAuth}>
          <ListCompany />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <NotProtectedRoute isAuth={isAuth}>
          <Login />
        </NotProtectedRoute>
      ),
    },
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: <p>Error 404</p>,
    },
  ]);

  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

// console.log(isAuth);

// const router = createBrowserRouter([
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/settings",
//     element: <Settings />,
//   },
//   {
//     path: "/companies",
//     element: <ListCompany />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/",
//     element: <Dashboard />,
//   },
//   {
//     path: "*",
//     element: <p>Error 404</p>,
//   },
// ]);

export default ApiRoute;
