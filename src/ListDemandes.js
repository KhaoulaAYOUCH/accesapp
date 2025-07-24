import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import demandesData from "./demandesData";

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

function ListDemandes() {
  // Get profile image from localStorage if available
  const profileImage = localStorage.getItem('profileImage');
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showAccessPopup, setShowAccessPopup] = React.useState(false);
  const [showProjectsPopup, setShowProjectsPopup] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [accessTypeFilter, setAccessTypeFilter] = React.useState("");
  const [societeFilter, setSocieteFilter] = React.useState("");
  const [projetFilter, setProjetFilter] = React.useState("");

  // Read status from URL query string
  const location = useLocation();
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get('status');
    if (statusParam) {
      // Capitalize first letter for filter match
      setStatusFilter(statusParam.charAt(0).toUpperCase() + statusParam.slice(1));
    }
  }, [location.search]);

  const handleAccessPopup = () => {
    setShowAccessPopup((prev) => !prev);
    setShowProjectsPopup(false);
  };
  const handleProjectsPopup = () => {
    setShowProjectsPopup((prev) => !prev);
    setShowAccessPopup(false);
  };
  // Use shared demandesData for all requests
  const demandes = demandesData;
  // Define notifications array
  const notifications = [
    "Nouvelle demande d'accès reçue",
    "Demande approuvée",
    "Demande refusée",
    "Votre accès a été activé"
  ];
  // Define navigate using useNavigate
  const navigate = useNavigate();
  // Filter logic
  const filteredDemandes = demandes.filter(d => {
    const matchesSearch =
      d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.cin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.societe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.demandeur.toLowerCase().includes(searchTerm.toLowerCase());
    // Accept both dashboard and dropdown values
    const matchesStatus = statusFilter ? d.statut.toLowerCase() === statusFilter.toLowerCase() : true;
    const matchesAccessType = accessTypeFilter ? d.typeAcces === accessTypeFilter : true;
    const matchesSociete = societeFilter ? d.societe === societeFilter : true;
    const matchesProjet = projetFilter ? d.projet === projetFilter : true;
    return matchesSearch && matchesStatus && matchesAccessType && matchesSociete && matchesProjet;
  });

  return (
    <>
      <style>{sidebarIconStyle}</style>
      <div style={{ minHeight: "100vh", background: "linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)", position: "relative" }}>
        {/* Sidebar - fixed */}
        <div style={{ position: "fixed", top: 0, left: 0, width: "72px", height: "100vh", background: "linear-gradient(180deg, #003b8e 0%, #00bfff 100%)", borderTopRightRadius: "18px", borderBottomRightRadius: "18px", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center", justifyContent: "center", height: "60vh" }}>
              <button className="btn btn-link p-0 sidebar-icon-btn" title="Home" style={{ background: "none" }} onClick={() => navigate('/dashboard')}>
                <i className="bi bi-house-door-fill fs-4 sidebar-icon"></i>
              </button>
              <button className="btn btn-link p-0 sidebar-icon-btn" title="Demande d'acces" style={{ background: "none", position: "relative" }} onClick={handleAccessPopup}>
                <i className="bi bi-person-check fs-4 sidebar-icon"></i>
                {showAccessPopup && (
                  <div style={{ position: "absolute", left: "60px", top: "-10px", minWidth: "220px", background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", borderRadius: "10px", zIndex: 100, padding: "16px 0" }}>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", borderBottom: "1px solid #f3f3f3", color: "#333", fontSize: "1rem" }} onClick={() => navigate('/ajouterdemande')}>
                        <i className="bi bi-person-plus fs-5 me-2" style={{ color: '#1f77b4' }}></i>
                        Ajouter une demande d'acces
                      </li>
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", color: "#333", fontSize: "1rem" }}>
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
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", borderBottom: "1px solid #f3f3f3", color: "#333", fontSize: "1rem" }} onClick={() => navigate('/ajouterprojet')}>
                        <i className="bi bi-folder-plus fs-5 me-2" style={{ color: '#1f77b4' }}></i>
                        Ajouter un projet
                      </li>
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", color: "#333", fontSize: "1rem" }} onClick={() => navigate('/listprojets')}>
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
            <button className="btn btn-link p-0 sidebar-icon-btn" title="Logout" style={{ background: "none" }} onClick={() => navigate('/login')}>
              <i className="bi bi-box-arrow-right fs-3 sidebar-icon"></i>
            </button>
          </div>
        </div>
        {/* Main Content - overlays sidebar visually */}
        <div style={{ marginLeft: "72px", position: "relative", zIndex: 1 }}>
          <Container fluid className="min-vh-100 p-0" style={{ background: "none" }}>
            <Row className="g-0">
              <Col md={12} xs={12} className="p-4">
                {/* Header + Access Type Radio Buttons */}
                <Row className="align-items-center mb-4">
                  <Col>
                    <h1 className="fw-bold fs-3">Liste des demandes d'accès</h1>
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
                      {/* Profile picture next to name, clickable, fallback to icon if not chosen */}
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid #003b8e", cursor: "pointer" }} onClick={() => navigate('/monprofile')} />
                      ) : (
                        <i className="bi bi-person-circle" style={{ fontSize: '2.2rem', color: '#003b8e', marginRight: 10, cursor: 'pointer' }} onClick={() => navigate('/monprofile')}></i>
                      )}
                      <div>
                        <div className="fw-semibold" style={{ cursor: 'pointer', color: 'inherit' }} onClick={() => navigate('/monprofile')}>AYOUCH Khaoula</div>
                        <div className="text-muted small">Field Services Coordinator</div>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* Search and Filter */}
                <div className="mb-3 d-flex flex-wrap gap-3 align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: 260, borderRadius: 8, background: '#f7f9fc', border: '1px solid #e0e7ff', fontSize: '1rem', color: '#003b8e' }}
                    placeholder="Rechercher"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <select
                    className="form-select"
                    style={{ maxWidth: 180, borderRadius: 8, background: '#f7f9fc', border: '1px solid #e0e7ff', fontSize: '1rem', color: '#003b8e' }}
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                  >
                    <option value="">Statut</option>
                    <option value="Validé">Validé</option>
                    <option value="En attente">En attente</option>
                    <option value="Refusé">Refusé</option>
                  </select>
                  <select
                    className="form-select"
                    style={{ maxWidth: 180, borderRadius: 8, background: '#f7f9fc', border: '1px solid #e0e7ff', fontSize: '1rem', color: '#003b8e' }}
                    value={accessTypeFilter}
                    onChange={e => setAccessTypeFilter(e.target.value)}
                  >
                    <option value="">Type d'accès</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Provisoir">Provisoir</option>
                  </select>
                  <select
                    className="form-select"
                    style={{ maxWidth: 180, borderRadius: 8, background: '#f7f9fc', border: '1px solid #e0e7ff', fontSize: '1rem', color: '#003b8e' }}
                    value={societeFilter}
                    onChange={e => setSocieteFilter(e.target.value)}
                  >
                    <option value="">Société</option>
                    <option value="JESA">JESA</option>
                    <option value="SEPROB">SEPROB</option>
                    <option value="AGNV">AGNV</option>
                  </select>
                  <select
                    className="form-select"
                    style={{ maxWidth: 180, borderRadius: 8, background: '#f7f9fc', border: '1px solid #e0e7ff', fontSize: '1rem', color: '#003b8e' }}
                    value={projetFilter}
                    onChange={e => setProjetFilter(e.target.value)}
                  >
                    <option value="">Projet</option>
                    <option value="Projet A">Projet A</option>
                    <option value="Projet B">Projet B</option>
                    <option value="Projet C">Projet C</option>
                    <option value="Projet D">Projet D</option>
                    <option value="Projet E">Projet E</option>
                    <option value="Projet F">Projet F</option>
                    <option value="Projet G">Projet G</option>
                    <option value="Projet H">Projet H</option>
                    <option value="Projet I">Projet I</option>
                    <option value="Projet J">Projet J</option>
                  </select>
                </div>
                {/* Requests Table */}
                <div className="mt-4">
                  <div className="table-responsive" style={{ borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,59,142,0.08)', overflow: 'hidden' }}>
                    <table className="table table-hover mb-0" style={{ background: '#fff', borderCollapse: 'separate', borderSpacing: 0 }}>
                      <thead>
                        <tr style={{ background: '#f7f9fc', borderBottom: '2px solid #e0e7ff' }}>
                          <th scope="col" style={{ padding: '16px 12px', color: '#222', fontWeight: 700, fontSize: '1.08rem', border: 'none', minWidth: '100px' }}>Code</th>
                          <th scope="col" style={{ padding: '16px 12px', color: '#222', fontWeight: 700, fontSize: '1.08rem', border: 'none', minWidth: '180px' }}>Nom complet</th>
                          <th scope="col" className="d-none d-md-table-cell" style={{ padding: '16px 12px', color: '#222', fontWeight: 700, fontSize: '1.08rem', border: 'none', minWidth: '140px' }}>CIN / Passeport</th>
                          <th scope="col" className="d-none d-lg-table-cell" style={{ padding: '16px 12px', color: '#222', fontWeight: 700, fontSize: '1.08rem', border: 'none', minWidth: '120px' }}>Société</th>
                          <th scope="col" className="d-none d-xl-table-cell" style={{ padding: '16px 12px', color: '#222', fontWeight: 700, fontSize: '1.08rem', border: 'none', minWidth: '140px' }}>Demandeur</th>
                          <th scope="col" className="d-none d-lg-table-cell" style={{ padding: '16px 12px', color: '#222', fontWeight: 700, fontSize: '1.08rem', border: 'none', minWidth: '120px' }}>Type d'accès</th>
                          <th scope="col" style={{ padding: '16px 12px', color: '#222', fontWeight: 700, fontSize: '1.08rem', border: 'none', minWidth: '120px' }}>Statut</th>
                          <th scope="col" style={{ padding: '16px 12px', color: '#222', fontWeight: 700, fontSize: '1.08rem', border: 'none', textAlign: 'center', minWidth: '80px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDemandes.length === 0 ? (
                          <tr>
                            <td colSpan={8} style={{ textAlign: 'center', padding: '32px', color: '#888', fontSize: '1.08rem' }}>Aucune demande trouvée.</td>
                          </tr>
                        ) : (
                          filteredDemandes.map((d, idx) => (
                            <tr key={d.code} style={{ borderBottom: '1px solid #f3f3f3' }}>
                              <td style={{ fontWeight: 700, padding: '14px 12px', color: '#222', fontSize: '0.95rem' }}>{d.code}</td>
                              <td style={{ fontWeight: 500, padding: '14px 12px', color: '#222', fontSize: '0.95rem' }}>
                                <div>{d.nom} {d.prenom}</div>
                                <div className="d-md-none text-muted small mt-1">
                                  {d.cin} • {d.societe}
                                </div>
                                <div className="d-md-none mt-2">
                                  <button className="btn btn-link p-0" style={{ color: '#003b8e', fontSize: '1rem' }} onClick={() => navigate(`/detaildemandes/${d.code}`)}>
                                    <i className="bi bi-eye"></i> <span style={{ fontSize: '0.9rem' }}>Consulter</span>
                                  </button>
                                </div>
                              </td>
                              <td className="d-none d-md-table-cell" style={{ fontWeight: 500, padding: '14px 12px', color: '#222', fontSize: '0.95rem' }}>{d.cin}</td>
                              <td className="d-none d-lg-table-cell" style={{ fontWeight: 500, padding: '14px 12px', color: '#222', fontSize: '0.95rem' }}>{d.societe}</td>
                              <td className="d-none d-xl-table-cell" style={{ fontWeight: 500, padding: '14px 12px', color: '#222', fontSize: '0.95rem' }}>{d.demandeur}</td>
                              <td className="d-none d-lg-table-cell" style={{ fontWeight: 500, padding: '14px 12px', color: '#222', fontSize: '0.95rem' }}>{d.typeAcces}</td>
                              <td style={{ padding: '14px 12px' }}>
                                {d.statut === 'Validé' ? (
                                  <span style={{ background: '#22c55e', color: '#fff', fontWeight: 600, fontSize: '0.85rem', padding: '4px 12px', borderRadius: '18px', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                                    <i className="bi bi-check-circle-fill" style={{ fontSize: '1em', color: '#fff', verticalAlign: 'middle' }}></i>
                                    <span className="d-none d-sm-inline">Validé</span>
                                  </span>
                                ) : d.statut === 'En attente' ? (
                                  <span style={{ background: '#fde047', color: '#003b8e', fontWeight: 600, fontSize: '0.85rem', padding: '4px 12px', borderRadius: '18px', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" stroke="#003b8e" strokeWidth="2" viewBox="0 0 24 24" style={{ verticalAlign: 'middle' }}>
                                      <circle cx="12" cy="12" r="9"/>
                                      <path d="M12 7v5l3 3"/>
                                    </svg>
                                    <span className="d-none d-sm-inline">En attente</span>
                                  </span>
                                ) : (
                                  <span style={{ background: '#ef4444', color: '#fff', fontWeight: 600, fontSize: '0.85rem', padding: '4px 12px', borderRadius: '18px', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                                    <i className="bi bi-x-circle-fill" style={{ fontSize: '1em', color: '#fff', verticalAlign: 'middle' }}></i>
                                    <span className="d-none d-sm-inline">Refusé</span>
                                  </span>
                                )}
                              </td>
                              <td className="text-center align-middle d-none d-md-table-cell" style={{ padding: '14px 12px' }}>
                                <button className="btn btn-sm" title="Voir" style={{ background: 'transparent', border: 'none', color: '#003b8e', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => navigate(`/detaildemandes/${d.code}`)}>
                                  <i className="bi bi-eye" style={{ fontSize: '1.25rem', color: '#003b8e' }}></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ListDemandes;
