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
import Profile from "./components/Profile";
import Draw from "./components/Draw";
import DrawPreview from "./components/DrawPreview";

const root = ReactDOM.createRoot(document.getElementById("root"));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/:action", element: <SignUpPage /> },
      { path: "/notes", element: <MyNotesPage /> },
      { path: "/note/:id/:action", element: <SingleNote /> },
      { path: "/userprofile", element: <Profile /> },
      { path: "/draw/create", element: <Draw /> },
      { path: "/draw/preview", element: <DrawPreview /> },
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
