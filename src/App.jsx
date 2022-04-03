import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Login from "./pages/login";
import Home from "./pages/Home";
import AddNewTest from "./pages/AddNewTest";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-new-test" element={<AddNewTest />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
