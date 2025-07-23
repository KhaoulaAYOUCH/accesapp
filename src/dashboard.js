import React from "react";
import demandesData from "./demandesData";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

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

const diagramData = {
  labels: ["Ouvriers", "Visiteurs", "Engins", "Matériaux"],
  datasets: [
	{
	  data: [120, 45, 12, 30],
	  backgroundColor: [
		'#1f77b4',  // Ouvriers
		'#ff7f0e',  // Visiteurs
		'#2ca02c',  // Engins
		'#d62728'   // Matériaux
	  ],
	  borderWidth: 2,
	},
  ],
};

const reports = [
  {
	name: "MPH Electrical",
	number: "QE226001",
	status: "Active",
	startDate: "2022-10-03",
	forecastEndDate: "2026-06-11"
  },
  {
	name: "Extension PDG PDE 60 Kv",
	number: "QE225912",
	status: "On Hold",
	startDate: "2024-12-24",
	forecastEndDate: "2025-12-31"
  },
  {
	name: "Campus Laayoune",
	number: "QB245301",
	status: "Closed",
	startDate: "2025-01-20",
	forecastEndDate: "2025-08-30"
  },
  {
	name: "Louta Mine",
	number: "Q8013011.C",
	status: "Active",
	startDate: "2022-08-15",
	forecastEndDate: "2026-06-14"
  },
  {
	name: "Mines Solar PV Benguerir",
	number: "Q2270041",
	status: "On Hold",
	startDate: "2022-03-01",
	forecastEndDate: "2024-10-20"
  }
];

// Helper to format date as 'DD MMM, YYYY'
function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
	day: '2-digit',
	month: 'short',
	year: 'numeric'
  });
}

function Dashboard() {
  // Get total requests from demandesData
  const totalRequests = Array.isArray(demandesData) ? demandesData.length : 0;
  // Dynamic counts for each status (French values)
  // Defensive: handle missing or inconsistent status values
  const pendingCount = Array.isArray(demandesData) ? demandesData.filter(d => (d.statut || '').toLowerCase() === 'en attente').length : 0;
  const approvedCount = Array.isArray(demandesData) ? demandesData.filter(d => (d.statut || '').toLowerCase() === 'validé').length : 0;
  const rejectedCount = Array.isArray(demandesData) ? demandesData.filter(d => (d.statut || '').toLowerCase() === 'refusé').length : 0;
  // Calculate unique users from demandesData (by CIN)
  const uniqueUsers = Array.isArray(demandesData)
	? [...new Set(demandesData.map(d => d.cin))].length
	: 0;
  // Get profile image from localStorage if available
  const profileImage = localStorage.getItem('profileImage');
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showAccessPopup, setShowAccessPopup] = React.useState(false);
  const [showProjectsPopup, setShowProjectsPopup] = React.useState(false);

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

  // Logout handler: clear localStorage/session and redirect
  const handleLogout = () => {
	// Clear localStorage (or sessionStorage) if you store auth info there
	localStorage.clear();
	// Optionally clear sessionStorage as well
	if (window.sessionStorage) window.sessionStorage.clear();
	// Redirect to login
	window.location.href = '/login';
  };

  return (
	<>
	  <style>{sidebarIconStyle}</style>
	  <div style={{ minHeight: "100vh", background: "linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)", position: "relative" }}>
		{/* Sidebar - fixed */}
		<div style={{ position: "fixed", top: 0, left: 0, width: "72px", height: "100vh", background: "linear-gradient(180deg, #003b8e 0%, #00bfff 100%)", borderTopRightRadius: "18px", borderBottomRightRadius: "18px", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: "18px 0" }}>
		  <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
			<div style={{ display: "flex", flexDirection: "column", gap: "32px", alignItems: "center", justifyContent: "center", height: "60vh" }}>
			  {/* ...existing sidebar buttons... */}
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
		  <div style={{ marginBottom: "12px" }}>
			<button className="btn btn-link p-0 sidebar-icon-btn" title="Logout" style={{ background: "none" }} onClick={handleLogout}>
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
					<h1 className="fw-bold fs-3">Espace d’accueil</h1>
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
					  {/* Profile picture next to name, clickable, fallback to icon if not chosen */}
					  {profileImage ? (
						<img src={profileImage} alt="Profile" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid #003b8e", cursor: "pointer" }} onClick={() => window.location.href = '/monprofile'} />
					  ) : (
						<i className="bi bi-person-circle" style={{ fontSize: '2.2rem', color: '#003b8e', marginRight: 10, cursor: 'pointer' }} onClick={() => window.location.href = '/monprofile'}></i>
					  )}
					  <div>
						<div className="fw-semibold" style={{ cursor: 'pointer', color: 'inherit' }} onClick={() => window.location.href = '/monprofile'}>
						  AYOUCH Khaoula
						</div>
						<div className="text-muted small">Field Services Coordinator</div>
					  </div>
					</div>
				  </Col>
				</Row>
				{/* Greeting */}
				<Row className="mb-4">
				  <Col>
					<h2 className="fs-4 fw-semibold">Bienvenue, Khaoula!</h2>
					<p className="text-secondary">Ce portail vous permet de gérer vos accès en toute sécurité.</p>
				  </Col>
				</Row>
				{/* Weekly Activity & Reports Summary */}
				<Row className="mb-4 g-4">
				  <Col md={7}>
					<Row className="g-3">
		  <Col xs={12} sm={6} md={6} lg={3}>
			<Card className="shadow-sm text-center" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/listdemandes'}>
			  <Card.Body>
				<i className="bi bi-key fs-2 text-primary mb-2"></i>
				<div className="fw-semibold mt-2">Totale des autorisations</div>
				<div className="badge bg-primary mt-2">{totalRequests}</div>
			  </Card.Body>
			</Card>
		  </Col>
		  <Col xs={12} sm={6} md={6} lg={3}>
			<Card className="shadow-sm text-center" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/listdemandes?status=en%20attente'}>
			  <Card.Body>
				<i className="bi bi-clock-history fs-2 text-warning mb-2"></i>
				<div className="fw-semibold mt-2">Approbations en attente</div>
				<div className="badge bg-warning text-dark mt-2">{pendingCount}</div>
			  </Card.Body>
			</Card>
		  </Col>
		  <Col xs={12} sm={6} md={6} lg={3}>
			<Card className="shadow-sm text-center" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/listdemandes?status=validé'}>
			  <Card.Body>
				<i className="bi bi-check-circle fs-2 text-success mb-2"></i>
				<div className="fw-semibold mt-2">Demandes approuvée</div>
				<div className="badge bg-success mt-2">{approvedCount}</div>
			  </Card.Body>
			</Card>
		  </Col>
		  <Col xs={12} sm={6} md={6} lg={3}>
			<Card className="shadow-sm text-center h-100" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/listdemandes?status=refusé'}>
			  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
				<i className="bi bi-x-circle fs-2 text-danger mb-2"></i>
				<div className="fw-semibold mt-2">Demandes rejetée</div>
				<div className="badge bg-danger mt-2">{rejectedCount}</div>
			  </Card.Body>
			</Card>
		  </Col>
					</Row>
				  </Col>
				  <Col md={5}>
					<Card className="shadow-sm text-center h-100">
					  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
			<div className="fw-bold fs-4 mb-1">Nombre total des utilisateurs</div>
			<div className="badge bg-info text-dark mb-2" style={{ fontSize: "1.2rem" }}>100</div>
					  </Card.Body>
					</Card>
				  </Col>
				</Row>
				{/* Projects and Diagram Section */}
				<Row className="mb-4 g-4">
				  <Col md={7}>
<Card className="shadow-sm" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/listprojets'}>
  <Card.Body>
	<div className="fw-bold mb-3">Liste des projets</div>
	<div style={{ width: '100%', overflowX: 'auto' }}>
	  <table className="table table-sm custom-table" style={{ border: "none", fontSize: '1rem', background: 'transparent', minWidth: 520, width: '100%' }}>
  <thead className="table-light">
	<tr>
	  <th style={{ fontWeight: 500, color: '#6c757d', background: 'transparent', border: 'none', textAlign: 'left' }}>Nom du projet</th>
	  <th style={{ fontWeight: 500, color: '#6c757d', background: 'transparent', border: 'none', textAlign: 'left' }}>Numéro</th>
	  <th style={{ fontWeight: 500, color: '#6c757d', background: 'transparent', border: 'none', textAlign: 'left' }}>Statut</th>
	  <th style={{ fontWeight: 500, color: '#6c757d', background: 'transparent', border: 'none', textAlign: 'left' }}>Date de début</th>
	  <th style={{ fontWeight: 500, color: '#6c757d', background: 'transparent', border: 'none', textAlign: 'left' }}>Date de fin prévisionnelle</th>
	</tr>
  </thead>
  <tbody>
{reports.map((report, idx) => [
  <tr key={"row-" + idx} style={{ background: '#fafdff', borderRadius: 12, boxShadow: '0 4px 18px 0 rgba(0,0,0,0.13)', border: 'none', height: 38 }}>
	<td style={{ border: 'none', color: '#222', fontWeight: 400, verticalAlign: 'middle', background: 'inherit', minWidth: 90, maxWidth: 180, width: '18vw', padding: '6px 8px', fontSize: '0.89rem', wordBreak: 'break-word' }}>{report.name}</td>
	<td style={{ border: 'none', color: '#222', fontWeight: 400, verticalAlign: 'middle', background: 'inherit', minWidth: 70, maxWidth: 120, width: '13vw', padding: '6px 7px', fontSize: '0.89rem', wordBreak: 'break-word' }}>{report.number}</td>
	<td style={{ border: 'none', color: '#222', fontWeight: 400, verticalAlign: 'middle', background: 'inherit', minWidth: 60, maxWidth: 100, width: '10vw', padding: '6px 6px', fontSize: '0.89rem', wordBreak: 'break-word' }}>{report.status}</td>
	<td style={{ border: 'none', color: '#222', fontWeight: 400, verticalAlign: 'middle', background: 'inherit', minWidth: 80, maxWidth: 120, width: '14vw', padding: '6px 6px', fontSize: '0.89rem', wordBreak: 'break-word' }}>{formatDate(report.startDate)}</td>
	<td style={{ border: 'none', color: '#222', fontWeight: 400, verticalAlign: 'middle', background: 'inherit', minWidth: 100, maxWidth: 140, width: '16vw', padding: '6px 6px', fontSize: '0.89rem', wordBreak: 'break-word' }}>{formatDate(report.forecastEndDate)}</td>
  </tr>,
  // Add a white separator row except after the last project
  idx < reports.length - 1 && (
	<tr key={"spacer-" + idx} style={{ height: 7, background: '#fff' }}>
	  <td colSpan={5} style={{ border: 'none', padding: 0, background: '#fff' }}></td>
	</tr>
  )
])}
  </tbody>
	  </table>
	</div>
					  </Card.Body>
					</Card>
				  </Col>
				  <Col md={5}>
					<Card className="shadow-sm text-center h-100">
					  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
						<div className="fw-bold mb-3">Aperçu du site</div>
						<div style={{ width: "220px", height: "220px", display: "flex", justifyContent: "center", alignItems: "center" }}>
						  <Doughnut
							data={diagramData}
							options={{
							  plugins: { legend: { display: false } },
							  animation: { animateRotate: true, animateScale: true },
							  cutout: "60%",
							}}
						  />
						</div>
					  </Card.Body>
					</Card>
				  </Col>
				</Row>
			  </Col>
			</Row>
		  </Container>
		</div>
	  </div>
	</>
  );
}

export default Dashboard;