import React, { useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import Header from "../components/header/Header";

function HomePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = localStorage.getItem("userData");
    const parsedData = JSON.parse(data);
    if (data) {
      setUser(parsedData);
    }
  }, []);

  return (
    <div>
      <Header />
      <Dashboard />
    </div>
  );
}

export default HomePage;
