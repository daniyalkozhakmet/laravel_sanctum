import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import GuestLayout from "./components/GuestLayout";
import { Protected } from "./components/Protected";
import { Profile } from "./views/Profile";
import { IfProtected } from "./components/IfProtected";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route path="/home" element={<Home />} />
          <Route
            path="/login"
            element={
              <IfProtected>
                <Login />
              </IfProtected>
            }
          />
          <Route
            path="/register"
            element={
              <IfProtected>
                <Register />
              </IfProtected>
            }
          />

          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
