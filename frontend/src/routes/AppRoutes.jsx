// src/routes/AppRoutes.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProfilDesa from "../pages/ProfilDesa";
import Login from "../pages/Login";
import Reset from "../pages/ResetPassword";
import Infografis from "../pages/Infografis";
import Pelayanan from "../pages/Pelayanan";
import Media from "../pages/Media";
import Arsip from "../pages/Arsip";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProfilDesa" element={<ProfilDesa />} />
        <Route path="/Infografis" element={<Infografis/>} />
        <Route path="/Pelayanan" element={<Pelayanan/>} />
        <Route path="/Media" element={<Media/>} />
        <Route path="/Arsip" element={<Arsip/>} />
        <Route path="/Login" element={<Login />}/>
        <Route path="/ResetPassword" element={<Reset />}/>
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
