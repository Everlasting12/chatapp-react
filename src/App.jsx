import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import useLoginStore from "./store/login.store";

function App() {
  const loadLogin = useLoginStore((state) => state.loadLogin);
  useEffect(() => {
    loadLogin();
  }, []);
  return (
    <div className="w-full h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
