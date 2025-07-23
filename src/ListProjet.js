
import React from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import "./App.css";

// Status options as in AjouterProjet
const STATUS_OPTIONS = [
  { value: "OnHold", label: "On Hold" },
  { value: "Active", label: "Active" },
  { value: "Closed", label: "Closed" },
];

function getStatusLabel(statusValue) {
  const found = STATUS_OPTIONS.find(opt => opt.value === statusValue);
  return found ? found.label : statusValue;
}

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


// Load projects from localStorage if available, otherwise use static array
function getProjects() {
  const stored = localStorage.getItem('projects');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback to static
    }
  }
  return [
    {
      projectName: "Nouveau Port de Laayoune",
      projectNumber: "DBP19021",
      bu: "Building",
      sector: "Building",
      program: "Port Program",
      projectSize: "Large",
      status: "Active",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      projectName: "PAP OSBL",
      projectNumber: "Q6633021",
      bu: "Fertilizer",
      sector: "Fertilizer",
      program: "Fertilizer Program",
      projectSize: "Medium",
      status: "OnHold",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    },
    {
      projectName: "Um6P Laayoune",
      projectNumber: "QB123409",
      bu: "Building",
      sector: "Building",
      program: "University Program",
      projectSize: "Small",
      status: "Closed",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80"
    },
    {
      projectName: "LPH Handling and Storage",
      projectNumber: "PQ6637021",
      bu: "Fertilizer",
      sector: "Fertilizer",
      program: "Storage Program",
      projectSize: "Large",
      status: "Active",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
    }
  ];
}


function ListProjet() {
  const [projects, setProjects] = React.useState(getProjects());
  const [showActive, setShowActive] = React.useState(true);
  const [search, setSearch] = React.useState("");

  // Keep in sync with localStorage if projects are added elsewhere
  React.useEffect(() => {
    const onStorage = () => {
      setProjects(getProjects());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  // Sidebar popups
  const [showAccessPopup, setShowAccessPopup] = React.useState(false);
  const [showProjectsPopup, setShowProjectsPopup] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  // Dummy notifications and profile
  const notifications = [
    "Nouvelle demande d'accès reçue",
    "Nouvelle demande d'entrée de matériel reçue",
    "Approbation en attente",
    "Utilisateur ajouté au projet"
  ];
  const profileImage = localStorage.getItem('profileImage');

  const handleAccessPopup = () => {
    setShowAccessPopup((prev) => !prev);
    setShowProjectsPopup(false);
  };
  const handleProjectsPopup = () => {
    setShowProjectsPopup((prev) => !prev);
    setShowAccessPopup(false);
  };

  // Filter projects based on active/inactive selection and search
  const filteredProjects = projects.filter(p => {
    const matchesStatus = showActive
      ? p.status === "Active" || p.status === "OnHold"
      : p.status === "Closed";
    const matchesSearch =
      p.projectName.toLowerCase().includes(search.toLowerCase()) ||
      p.projectNumber.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Handle card click to navigate to detail page
  const handleCardClick = (projectNumber) => {
    window.location.href = `/detailprojet/${projectNumber}`;
  };

  return (
    <>
      <style>{sidebarIconStyle}</style>
      <div style={{ minHeight: "100vh", background: "linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)", position: "relative" }}>
        {/* Sidebar - fixed */}
        <div style={{ position: "fixed", top: 0, left: 0, width: "72px", height: "100vh", background: "linear-gradient(180deg, #003b8e 0%, #00bfff 100%)", borderTopRightRadius: "18px", borderBottomRightRadius: "18px", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center", justifyContent: "center", height: "60vh" }}>
              {/* Home */}
              <button className="btn btn-link p-0 sidebar-icon-btn" title="Accueil" style={{ background: "none" }} onClick={() => window.location.href = '/dashboard'}>
                <i className="bi bi-house-door-fill fs-4 sidebar-icon"></i>
              </button>
              {/* Demande d'acces */}
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
              {/* Matériel et Engins */}
              <button className="btn btn-link p-0 sidebar-icon-btn" title="Matériel et Engins" style={{ background: "none" }}>
                <i className="bi bi-truck fs-4 sidebar-icon"></i>
              </button>
              {/* Projets */}
              <button className="btn btn-link p-0 sidebar-icon-btn" title="Projets" style={{ background: "none", position: "relative" }} onClick={handleProjectsPopup}>
                <i className="bi bi-folder2-open fs-4 sidebar-icon"></i>
                {showProjectsPopup && (
                  <div style={{ position: "absolute", left: "60px", top: "-10px", minWidth: "220px", background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", borderRadius: "10px", zIndex: 100, padding: "16px 0" }}>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", borderBottom: "1px solid #f3f3f3", color: "#333", fontSize: "1rem" }} onClick={() => window.location.href = '/ajouterprojet'}>
                        <i className="bi bi-folder-plus fs-5 me-2" style={{ color: '#1f77b4' }}></i>
                        Ajouter un projet
                      </li>
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", color: "#333", fontSize: "1rem" }} onClick={() => window.location.href = '/listprojets'}>
                        <i className="bi bi-folder2 fs-5 me-2" style={{ color: '#ff7f0e' }}></i>
                        Mes projets
                      </li>
                    </ul>
                  </div>
                )}
              </button>
            </div>
          </div>
          {/* Logout at the bottom */}
          <div style={{ marginBottom: "12px" }}>
            <button className="btn btn-link p-0 sidebar-icon-btn" title="Déconnexion" style={{ background: "none" }} onClick={() => window.location.href = '/login'}>
              <i className="bi bi-box-arrow-right fs-3 sidebar-icon"></i>
            </button>
          </div>
        </div>
        {/* Main Content - overlays sidebar visually */}
        <div style={{ marginLeft: "72px", position: "relative", zIndex: 1 }}>
          <Container fluid className="min-vh-100 p-0" style={{ background: "linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)" }}>
            <Row className="g-0">
              <Col md={12} xs={12} className="p-4">
                {/* Header */}
                <Row className="align-items-center mb-4">
                  <Col>
                    <h1 className="fw-bold fs-3">Liste des projets</h1>
                  </Col>
                  <Col xs="auto" className="d-flex align-items-center">
                    <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "12px" }}>
                      <button style={{ border: "none", background: "none", position: "relative" }} onClick={() => setShowNotifications((prev) => !prev)}>
                        <i className="bi bi-bell fs-2 sidebar-icon" style={{ marginRight: "8px", color: "red" }}></i>
                        <span style={{ position: "absolute", top: "-6px", right: "0", background: "red", color: "white", borderRadius: "50%", padding: "2px 6px", fontSize: "0.8rem", fontWeight: "bold", boxShadow: "0 0 6px rgba(0,0,0,0.2)" }}>{notifications.length}</span>
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
                {/* Search Bar */}
                <div className="mb-3" style={{ maxWidth: 400 }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rechercher par nom ou numéro de projet..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                {/* Project Filter Buttons */}
                <div className="mb-4 d-flex gap-3">
                  <Button
                    variant={showActive ? "primary" : "outline-primary"}
                    onClick={() => setShowActive(true)}
                  >
                    Projets actifs
                  </Button>
                  <Button
                    variant={!showActive ? "primary" : "outline-primary"}
                    onClick={() => setShowActive(false)}
                  >
                    Projets inactifs
                  </Button>
                </div>
                {/* Project Cards Grid */}
                <Row xs={1} sm={2} md={4} className="g-4">
                  {filteredProjects.map((project, idx) => (
                    <Col key={project.projectNumber || idx}>
                      <Card
                        className="shadow-sm h-100"
                        style={{ borderRadius: 18, border: "none", cursor: "pointer" }}
                        onClick={() => handleCardClick(project.projectNumber)}
                      >
                        <div style={{ height: 120, overflow: "hidden", borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                          <Card.Img
                            variant="top"
                            src={project.image}
                            alt={project.projectName}
                            style={{ height: 120, objectFit: "cover", borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
                          />
                        </div>
                        <Card.Body className="d-flex flex-column justify-content-between">
                          <div>
                            <Card.Title className="fw-bold" style={{ fontSize: "1.1rem" }}>{project.projectName}</Card.Title>
                            <Card.Text className="text-muted" style={{ fontSize: "0.95rem" }}>N°: {project.projectNumber}</Card.Text>
                            <div className="mb-1"><span className="fw-semibold">BU:</span> {project.bu}</div>
                            <div className="mb-1"><span className="fw-semibold">Secteur:</span> {project.sector}</div>
                            <div className="mb-1"><span className="fw-semibold">Programme:</span> {project.program}</div>
                            <div className="mb-1"><span className="fw-semibold">Taille:</span> {project.projectSize}</div>
                            <div className="mb-1"><span className="fw-semibold">Statut:</span> {getStatusLabel(project.status)}</div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ListProjet;
