import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import LandingPage from "./pages/landingPage/LandingPage";
import MyNotesPage from "./pages/MyNotesPage";
import SignUpPage from "./pages/SignUpPage";
import appStore from "./store/appStore";
import SingleNote from "./components/SingleNote";
import CategoriesPage from "./pages/CategoriesPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/notes", element: <MyNotesPage /> },
      { path: "/category", element: <CategoriesPage /> },
      { path: "/:action", element: <SignUpPage /> },
      { path: "/note/:id/:action", element: <SingleNote /> },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);
