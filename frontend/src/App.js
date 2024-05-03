import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./store/userSlice";

function App() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      dispatch(addUser(JSON.parse(localStorage.getItem("userInfo"))));
    }
  }, []);
  return (
    <>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Outlet context={[searchText]} />
      <Footer />
    </>
  );
}

export default App;
