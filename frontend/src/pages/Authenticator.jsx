import React, { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.birds.min";
import * as THREE from "three";
import '../Styles/auth.scss'
import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ResetPasswordPage from "./ResetPasswordPage";



const Authenticator = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 600.0,
          minWidth: 600.0,
          scale: 1.0,
          scaleMobile: 1.0
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div className="auth" ref={vantaRef}>
      <p style={{ color: "#fff", paddingTop: "20px" }}>

      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
      </Routes>
      </p>
    </div>
  );
};


export default Authenticator