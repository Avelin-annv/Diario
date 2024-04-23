import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./pages/landingPage/LandingPage";
import MyNotesPage from "./pages/MyNotesPage";
import Home from "./pages/Home";
import Note from "./components/Note";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/notes", element: <MyNotesPage /> },
      { path: "/home", element: <Home /> },
      { path: "/note/:id", element: <Note /> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>
);
