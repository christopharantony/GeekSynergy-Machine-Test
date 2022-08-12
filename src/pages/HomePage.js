import React, { useEffect, useState } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import Header from "../components/header/Header";

function HomePage() {

  return (
    <div>
      <Header />
      <Dashboard />
    </div>
  );
}

export default HomePage;
