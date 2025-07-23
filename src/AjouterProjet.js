
import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Container, Row, Col, Card } from "react-bootstrap";

const sidebarIconStyle = `
.sidebar-icon { color: #fff; opacity: 0.7; transition: color 0.2s, opacity 0.2s; }
.sidebar-icon-btn:hover .sidebar-icon { color: #00bfff !important; opacity: 1; }
.custom-table thead th {
  color: #6c757d;
  font-weight: 500;
  background: none;
  border-bottom: 1.5px solid #e9ecef;
}
.custom-table tbody td {
  border-bottom: 1px solid #f3f3f3;
}
.custom-table tbody tr:last-child td {
  border-bottom: 1px solid #e9ecef;
}
`;

function AjouterProjet() {
  const profileImage = localStorage.getItem('profileImage');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccessPopup, setShowAccessPopup] = useState(false);
  const [showProjectsPopup, setShowProjectsPopup] = useState(false);

  const [form, setForm] = useState({
    projectName: "",
    projectNumber: "",
    bu: "",
    sector: "",
    program: "",
    subProgram: "",
    projectSize: "",
    riskClassification: "",
    status: "",
    atRisk: false,
    hasWorkLocations: false,
    homeOffice: "",
    siteLocation: "",
    phase: "",
    greenField: "",
    picture: null,
    workOrderNumber: "",
    workOrderType: "",
    pm: "",
    constructionManager: "",
    hseManager: "",
    qualityManager: "",
    fieldServicesCoordinator: "",
  });
  const [workOrders, setWorkOrders] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [mapPosition, setMapPosition] = useState([33.5731, -7.5898]); // Default: Casablanca
  const mapRef = useRef();

  async function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (name === "siteLocation" && value.trim().length > 1) {
        // Geocode city name
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`);
          const data = await response.json();
          if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setMapPosition([lat, lon]);
            if (mapRef.current) {
              mapRef.current.setView([lat, lon], 12);
            }
          }
        } catch (err) {
          // Ignore geocode errors
        }
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    alert("Projet ajouté avec succès !");
    setForm({
      projectName: "",
      projectNumber: "",
      bu: "",
      sector: "",
      program: "",
      subProgram: "",
      projectSize: "",
      riskClassification: "",
      status: "",
      atRisk: false,
      hasWorkLocations: false,
      homeOffice: "",
      siteLocation: "",
      phase: "",
      greenField: "",
      picture: null,
      workOrderNumber: "",
      workOrderType: "",
    });
    setWorkOrders([]);
  }

  function handleAddWorkOrder() {
    if (form.workOrderNumber && form.workOrderType) {
      setWorkOrders((prev) => [
        ...prev,
        { number: form.workOrderNumber, type: form.workOrderType }
      ]);
      setForm((prev) => ({ ...prev, workOrderNumber: "", workOrderType: "" }));
    }
  }

  const handleAccessPopup = () => {
    setShowAccessPopup((prev) => !prev);
    setShowProjectsPopup(false);
  };
  const handleProjectsPopup = () => {
    setShowProjectsPopup((prev) => !prev);
    setShowAccessPopup(false);
  };
  const notifications = [
    "Nouvelle demande d'accès reçue",
    "Nouvelle demande d'entrée de matériel reçue",
    "Approbation en attente",
    "Utilisateur ajouté au projet"
  ];

  return (
    <>
      <style>{sidebarIconStyle}</style>
      <div style={{ minHeight: "100vh", background: "linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)", position: "relative" }}>
        {/* Sidebar - fixed */}
        <div style={{ position: "fixed", top: 0, left: 0, width: "72px", height: "100vh", background: "linear-gradient(180deg, #003b8e 0%, #00bfff 100%)", borderTopRightRadius: "18px", borderBottomRightRadius: "18px", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center", justifyContent: "center", height: "60vh" }}>
              <button className="btn btn-link p-0 sidebar-icon-btn" title="Home" style={{ background: "none" }} onClick={() => window.location.href = '/dashboard'}>
                <i className="bi bi-house-door-fill fs-4 sidebar-icon"></i>
              </button>
              <button className="btn btn-link p-0 sidebar-icon-btn" title="Demande d'acces" style={{ background: "none", position: "relative" }} onClick={handleAccessPopup}>
                <i className="bi bi-person-check fs-4 sidebar-icon"></i>
                {showAccessPopup && (
                  <div style={{ position: "absolute", left: "60px", top: "-10px", minWidth: "220px", background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", borderRadius: "10px", zIndex: 100, padding: "16px 0" }}>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", borderBottom: "1px solid #f3f3f3", color: "#333", fontSize: "1rem" }} onClick={() => window.location.href = '/ajouterdemande'}>
                        <i className="bi bi-person-plus fs-5 me-2" style={{ color: '#1f77b4' }}></i>
                        Ajouter une demande d'acces
                      </li>
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", color: "#333", fontSize: "1rem" }} onClick={() => window.location.href = '/listdemandes'}>
                        <i className="bi bi-list-check fs-5 me-2" style={{ color: '#ff7f0e' }}></i>
                        Suivi des demandes d'acces
                      </li>
                    </ul>
                  </div>
                )}
              </button>
              <button className="btn btn-link p-0 sidebar-icon-btn" title="Matériel et Engins" style={{ background: "none" }}>
                <i className="bi bi-truck fs-4 sidebar-icon"></i>
              </button>
              <button className="btn btn-link p-0 sidebar-icon-btn" title="Projets" style={{ background: "none", position: "relative" }} onClick={handleProjectsPopup}>
                <i className="bi bi-folder2-open fs-4 sidebar-icon"></i>
                {showProjectsPopup && (
                  <div style={{ position: "absolute", left: "60px", top: "-10px", minWidth: "220px", background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", borderRadius: "10px", zIndex: 100, padding: "16px 0" }}>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", borderBottom: "1px solid #f3f3f3", color: "#333", fontSize: "1rem" }} onClick={() => window.location.href = '/ajouterprojet'}>
                        <i className="bi bi-folder-plus fs-5 me-2" style={{ color: '#1f77b4' }}></i>
                        Ajouter un projet
                      </li>
                      <li
                        style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", color: "#333", fontSize: "1rem" }}
                        onClick={() => window.location.href = '/listprojets'}
                      >
                        <i className="bi bi-folder2 fs-5 me-2" style={{ color: '#ff7f0e' }}></i>
                        Mes projets
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <button className="btn btn-link p-0 sidebar-icon-btn" title="Logout" style={{ background: "none" }} onClick={() => window.location.href = '/login'}>
              <i className="bi bi-box-arrow-right fs-3 sidebar-icon"></i>
            </button>
          </div>
        </div>
        {/* Main Content - overlays sidebar visually */}
        <div style={{ marginLeft: "72px", position: "relative", zIndex: 1 }}>
          <Container fluid className="min-vh-100 p-0" style={{ background: "none" }}>
            <Row className="g-0">
              <Col md={12} xs={12} className="p-4">
                {/* Header */}
                <Row className="align-items-center mb-4">
                  <Col>
                    <h1 className="fw-bold fs-3">Ajouter un projet</h1>
                  </Col>
                  <Col xs="auto" className="d-flex align-items-center">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ position: "relative" }}>
                        <button style={{ border: "none", background: "none", position: "relative" }} onClick={() => setShowNotifications((prev) => !prev)}>
                          <i className="bi bi-bell fs-2 sidebar-icon" style={{ marginRight: "8px", color: "#ff2e2e" }}></i>
                          <span style={{ position: "absolute", top: "-6px", right: "0", background: "#ff2e2e", color: "white", borderRadius: "50%", padding: "2px 6px", fontSize: "0.8rem", fontWeight: "bold", boxShadow: "0 0 6px rgba(0,0,0,0.2)" }}>{notifications.length}</span>
                        </button>
                        {showNotifications && (
                          <div style={{ position: "absolute", top: "40px", right: "0", minWidth: "260px", background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", borderRadius: "10px", zIndex: 10, padding: "12px 0" }}>
                            <div style={{ fontWeight: "bold", padding: "0 16px 8px 16px", color: "#003b8e" }}>Notifications</div>
                            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                              {notifications.map((note, idx) => (
                                <li key={idx} style={{ padding: "8px 16px", borderBottom: idx !== notifications.length - 1 ? "1px solid #f3f3f3" : "none", color: "#333", fontSize: "0.98rem" }}>{note}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid #003b8e", cursor: "pointer" }} onClick={() => window.location.href = '/monprofile'} />
                      ) : (
                        <i className="bi bi-person-circle" style={{ fontSize: '2.2rem', color: '#003b8e', marginRight: 10, cursor: 'pointer' }} onClick={() => window.location.href = '/monprofile'}></i>
                      )}
                      <div>
                        <div className="fw-semibold" style={{ cursor: 'pointer', color: 'inherit' }} onClick={() => window.location.href = '/monprofile'}>AYOUCH Khaoula</div>
                        <div className="text-muted small">Field Services Coordinator</div>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* Project Handover Information */}
                <Card className="shadow-sm" style={{ borderRadius: '18px', border: 'none', background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)' }}>
                  <Card.Body>
                      <div className="text-center mb-4">
                        <h2 className="fw-bold mt-2" style={{ color: '#003b8e', letterSpacing: '1px' }}>AJOUTER UN PROJET</h2>
                        <div className="text-secondary">Renseignez les informations ci-dessous pour ajouter un projet</div>
                      </div>
                      <form onSubmit={handleSubmit}>
                      <Row className="mb-3">
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Nom du projet<span className="text-danger">*</span></label>
                          <input type="text" className="form-control" name="projectName" value={form.projectName} onChange={handleChange} required />
                        </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Numéro du projet<span className="text-danger">*</span></label>
                          <input type="text" className="form-control" name="projectNumber" value={form.projectNumber} onChange={handleChange} required />
                        </Col>
                    {/* Date de début */}
                    <Col md={6} className="mb-3">
                      <label className="form-label fw-semibold">Date de début<span className="text-danger">*</span></label>
                      <input type="date" className="form-control" name="startDate" value={form.startDate || ''} onChange={handleChange} required />
                    </Col>
                    {/* Date de fin prévisionnelle */}
                    <Col md={6} className="mb-3">
                      <label className="form-label fw-semibold">Date de fin prévisionnelle<span className="text-danger">*</span></label>
                      <input type="date" className="form-control" name="forecastEndDate" value={form.forecastEndDate || ''} onChange={handleChange} required />
                    </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">BU<span className="text-danger">*</span></label>
                          <select className="form-select" name="bu" value={form.bu} onChange={handleChange} required>
                            <option value="" disabled hidden>Choisir une BU</option>
                            <option value="Asset Management">Asset Management</option>
                            <option value="Energy">Energy</option>
                            <option value="Water & Environment">Water & Environment</option>
                            <option value="SP2M">SP2M</option>
                            <option value="South AXE M&I">South AXE M&I</option>
                            <option value="Mining">Mining</option>
                            <option value="Building & Urban">Building & Urban</option>
                            <option value="Ma'aden">Ma'aden</option>
                            <option value="Chemical & fertilizer">Chemical & fertilizer</option>
                            <option value="Automatically displayed by MDH">Automatically displayed by MDH</option>
                            <option value="Home Office">Home Office</option>
                            <option value="Power to X">Power to X</option>
                          </select>
                        </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Secteur</label>
                          <select className="form-select" name="sector" value={form.sector} onChange={handleChange}>
                            <option value="" disabled hidden>Choisir un secteur</option>
                            <option value="Ma'aden">Ma'aden</option>
                            <option value="Mining">Mining</option>
                            <option value="Energy">Energy</option>
                            <option value="Asset Management">Asset Management</option>
                            <option value="MPH">MPH</option>
                            <option value="South Axis (PFC)">South Axis (PFC)</option>
                            <option value="Buildings">Buildings</option>
                            <option value="Water">Water</option>
                            <option value="Grid Energy">Grid Energy</option>
                            <option value="Cogeneration">Cogeneration</option>
                            <option value="Power to X">Power to X</option>
                            <option value="SP2M">SP2M</option>
                            <option value="Ports and infrastructures">Ports and infrastructures</option>
                            <option value="Sustainable capital solution">Sustainable capital solution</option>
                            <option value="Maintenance and operations">Maintenance and operations</option>
                            <option value="Fertilizer & Chemical">Fertilizer & Chemical</option>
                          </select>
                        </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Programme</label>
                          <select className="form-select" name="program" value={form.program} onChange={handleChange}>
                            <option value="" disabled hidden>Choisir un programme</option>
                            <option value="OMT">OMT</option>
                            <option value="South Axe">South Axe</option>
                            <option value="Mining">Mining</option>
                            <option value="Desalination">Desalination</option>
                            <option value="Jorf & Safi Acids">Jorf & Safi Acids</option>
                            <option value="Jorf & Safi Fertilizer">Jorf & Safi Fertilizer</option>
                            <option value="Jorf & Safi Speciality Products">Jorf & Safi Speciality Products</option>
                            <option value="Building North Axe">Building North Axe</option>
                            <option value="Environment & Waste Management">Environment & Waste Management</option>
                            <option value="Power to X">Power to X</option>
                            <option value="Test Program">Test Program</option>
                            <option value="SP2M">SP2M</option>
                            <option value="Mine">Mine</option>
                            <option value="3MT TSP">3MT TSP</option>
                            <option value="Water Transport">Water Transport</option>
                            <option value="Water">Water</option>
                          </select>
                        </Col>
                        <Col md={6} className="mb-3">
                          {/* Champ Sous-programme (Portefeuille) supprimé comme demandé */}
                        </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Taille du projet<span className="text-danger">*</span></label>
                          <select className="form-select" name="projectSize" value={form.projectSize} onChange={handleChange} required>
                            <option value="" disabled hidden>Choisir la taille</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="Mega">Mega</option>
                          </select>
                        </Col>
                        {/* Champs 'Projet avec plusieurs sites ?', 'À risque', et 'Classification du risque' supprimés comme demandé */}
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Statut<span className="text-danger">*</span></label>
                          <select className="form-select" name="status" value={form.status} onChange={handleChange} required>
                            <option value="" disabled hidden>Choisir le statut</option>
                            <option value="Active">Active</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Photo</label>
                          <div className="border rounded d-flex flex-column align-items-center justify-content-center" style={{ minHeight: 120, borderStyle: 'dashed', borderColor: '#b3c6e0', width: '100%', position: 'relative' }}>
                            <input type="file" name="picture" accept="image/png, image/jpeg, image/jpg" onChange={handleChange} style={{ display: 'none' }} id="picture-upload" />
                            <label htmlFor="picture-upload" style={{ cursor: 'pointer', color: '#003b8e', fontWeight: 500, padding: 16, textAlign: 'center', width: '100%' }}>
                              <div><i className="bi bi-cloud-arrow-up" style={{ fontSize: '2rem' }}></i></div>
                              Drag and drop Upload<br />
                              <span style={{ color: '#00bfff', textDecoration: 'underline' }}>or browse</span><br />
                              <span style={{ color: '#888', fontSize: '0.95em' }}>supports:PNG, JPEG, JPG<br />Max Size: 5MB</span>
                            </label>
                            {form.picture && form.picture.type && form.picture.type.startsWith('image/') && (
                              <img
                                src={URL.createObjectURL(form.picture)}
                                alt="Aperçu"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  borderRadius: 'inherit',
                                  zIndex: 1
                                }}
                              />
                            )}
                          </div>
                        </Col>
                      </Row>
                      {/* Location Section */}
                      <h5 className="fw-bold mb-3 mt-4">Localisation</h5>
                      <Row className="mb-3">
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Localisation du siège<span className="text-danger">*</span></label>
                          <input type="text" className="form-control" name="homeOffice" value={form.homeOffice} onChange={handleChange} required />
                        </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Localisation du site<span className="text-danger">*</span></label>
                          <input type="text" className="form-control" name="siteLocation" value={form.siteLocation} onChange={handleChange} required />
                        </Col>
                      </Row>
                      {/* Champ Photo déplacé dans la section Project handover information */}
                      {/* Project Members Section */}
                      <h5 className="fw-bold mb-3 mt-4">Membres du projet</h5>
                      <Row className="mb-3">
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Project Manager (PM)</label>
                          <input type="text" className="form-control" name="pm" value={form.pm || ''} onChange={handleChange} />
                        </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Construction Manager</label>
                          <input type="text" className="form-control" name="constructionManager" value={form.constructionManager || ''} onChange={handleChange} />
                        </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">HSE Manager</label>
                          <input type="text" className="form-control" name="hseManager" value={form.hseManager || ''} onChange={handleChange} />
                        </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Quality Manager</label>
                          <input type="text" className="form-control" name="qualityManager" value={form.qualityManager || ''} onChange={handleChange} />
                        </Col>
                        <Col md={6} className="mb-3">
                          <label className="form-label fw-semibold">Field Services Coordinator</label>
                          <input type="text" className="form-control" name="fieldServicesCoordinator" value={form.fieldServicesCoordinator || ''} onChange={handleChange} />
                        </Col>
                      </Row>
                      {/* Work Orders */}
                      <h5 className="fw-bold mb-3 mt-4">Work Orders</h5>
                      <Row className="mb-3 align-items-end">
                        <Col md={5} className="mb-3">
                          <label className="form-label fw-semibold">Numéro du WO</label>
                          <input type="text" className="form-control" name="workOrderNumber" value={form.workOrderNumber} onChange={handleChange} />
                        </Col>
                        <Col md={5} className="mb-3">
                          <label className="form-label fw-semibold">Type du WO</label>
                          <select className="form-select" name="workOrderType" value={form.workOrderType} onChange={handleChange}>
                            <option value="" disabled hidden>Choisir le type d'ordre</option>
                            <option value="Cost Fee">Cost Fee</option>
                            <option value="Professional services">Professional services</option>
                            <option value="OMT Professional services">OMT Professional services</option>
                          </select>
                        </Col>
                        <Col md={2} className="mb-3">
                          <button type="button" className="btn btn-primary w-100" onClick={handleAddWorkOrder}>+</button>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          {workOrders.length > 0 && (
                            <div className="mb-3">
                              {workOrders.map((wo, idx) => (
                                <span key={idx} className="badge bg-light text-dark me-2 mb-2" style={{ fontSize: '1em', border: '1px solid #e0e7ff' }}>{wo.number} {wo.type}</span>
                              ))}
                            </div>
                          )}
                        </Col>
                      </Row>
                      <div className="d-flex justify-content-end gap-3 mt-4">
                        <button type="button" className="btn" style={{ background: '#e0e7ff', color: '#003b8e', border: '1px solid #003b8e' }} onClick={() => window.location.href = '/dashboard'}>Annuler</button>
                        <button type="submit" className="btn" style={{ background: '#003b8e', color: '#fff', border: 'none' }}>Ajouter</button>
                      </div>
                      {submitted && <div className="alert alert-success mt-3">Projet ajouté avec succès !</div>}
                    </form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default AjouterProjet;
