
import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LoginPage from "./login";
import Dashboard from "./dashboard";
import AjouterDemande from "./AjouterDemande";
import ListDemandes from "./ListDemandes";
import DetailDemandes from "./DetailDemandes";
import demandesData from "./demandesData";
import AjouterDemandeInvit from "./AjouterDemandeInvit";
import MonProfile from "./monprofile";
import AjouterProjet from "./AjouterProjet";
import ListProjet from "./ListProjet";
import DetailProjet from "./DetailProjet";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ajouterdemande" element={<AjouterDemande />} />
        <Route path="/listdemandes" element={<ListDemandes />} />
        <Route path="/detaildemandes/:code" element={<DetailDemandes />} />
        <Route path="/detaildemandes" element={<DetailDemandes />} />
        <Route path="/monprofile" element={<MonProfile />} />
        <Route path="/demandesData" element={<demandesData />} />
        <Route path="/AjouterDemandeInvit" element={<AjouterDemandeInvit />} />
        <Route path="/ajouterprojet" element={<AjouterProjet />} />
        <Route path="/listprojets" element={<ListProjet />} />
        <Route path="/detailprojet/:projectNumber" element={<DetailProjet />} />
        {/* Add more routes as needed */}
      </Routes>
    </HashRouter>
  );
}

export default App;
