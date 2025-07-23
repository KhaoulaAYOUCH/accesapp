// ...removed invalid adjacent JSX labels...
import React from "react";
import DocChecker from "./DocChecker";
import emailjs from 'emailjs-com';
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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

function AjouterDemande() {
  const navigate = useNavigate();
  
  // Get profile image from localStorage if available
  const profileImage = localStorage.getItem('profileImage');
  // Temporary access: car list state
  const [temporaryCars, setTemporaryCars] = React.useState([
    { marque: '', modele: '', matricule: '', color: '' }
  ]);

  function handleTemporaryCarChange(idx, field, value) {
    setTemporaryCars(prev => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  }

  function handleAddTemporaryCar() {
    setTemporaryCars(prev => ([...prev, { marque: '', modele: '', matricule: '', color: '' }]));
  }

  function handleRemoveTemporaryCar(idx) {
    setTemporaryCars(prev => prev.filter((_, i) => i !== idx));
  }

  // Temporary access: object list state
  const [temporaryObjects, setTemporaryObjects] = React.useState([
    { objetType: '', commentaire: '' }
  ]);

  function handleTemporaryObjectChange(idx, field, value) {
    setTemporaryObjects(prev => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  }

  function handleAddTemporaryObject() {
    setTemporaryObjects(prev => ([...prev, { objetType: '', commentaire: '' }]));
  }

  function handleRemoveTemporaryObject(idx) {
    setTemporaryObjects(prev => prev.filter((_, i) => i !== idx));
  }
  // Permanent access: vehicle/engin list state
  const [permanentVehicles, setPermanentVehicles] = React.useState([
    { type: '', marque: '', modele: '', matricule: '', color: '', permis: null, papiers: null }
  ]);

  function handlePermanentVehicleChange(idx, field, value) {
    setPermanentVehicles(prev => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  }

  function handlePermanentVehicleFileChange(idx, field, file) {
    setPermanentVehicles(prev => {
      const updated = [...prev];
      updated[idx][field] = file;
      return updated;
    });
  }

  function handleAddPermanentVehicle() {
    setPermanentVehicles(prev => ([...prev, { type: '', marque: '', modele: '', matricule: '', color: '', permis: null, papiers: null }]));
  }

  function handleRemovePermanentVehicle(idx) {
    setPermanentVehicles(prev => prev.filter((_, i) => i !== idx));
  }
  // Form state and handlers
  const [accessType, setAccessType] = React.useState('temporary');
  const [form, setForm] = React.useState({
    nom: '',
    prenom: '',
    cin: '',
    societe: '',
    statut: '',
    mission: '',
    projet: '',
    dateDebut: '',
    dateFin: '',
    copieCin: null,
    telephone: '',
    nationalite: 'Marocain',
    voiture: 'Non',
    marque: '',
    modele: '',
    matricule: '',
    color: '',
    apport: 'Non',
    objetType: '',
    commentaire: '',
    acceptTerms: false,
  });
  const [showInvitePopup, setShowInvitePopup] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteSent, setInviteSent] = React.useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }


  const [cinError, setCinError] = React.useState("");
  const [cinFile, setCinFile] = React.useState(null);
  const [showDocChecker, setShowDocChecker] = React.useState(false);
  const [docCheckerResult, setDocCheckerResult] = React.useState("");
  // Anthropometric fiche file and result
  const [ficheFile, setFicheFile] = React.useState(null);
  const [ficheResult, setFicheResult] = React.useState("");

function handleFileChange(e) {
  const file = e.target.files[0];
  if (file) {
    setCinError("");
    setCinFile(file);
    setShowDocChecker(true);
  } else {
    setCinError("");
    setForm((prev) => ({ ...prev, copieCin: null }));
    setShowDocChecker(false);
    setCinFile(null);
  }
}

  function handleSubmit(e) {
    e.preventDefault();
    // Generate a random request number (simulate)
    const requestNumber = Math.floor(100000 + Math.random() * 900000);
    // Collect all form data
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // For demonstration, log the values
    const plainData = {};
    formData.forEach((value, key) => {
      plainData[key] = value;
    });
    console.log('Form data:', plainData);
    alert(`Votre demande avec le numéro ${requestNumber} a été envoyée pour approbation.`);
    // You can send formData to your API here
  }

  function handleSendInvitation() {
    setInviteSent(true);
    const templateParams = {
      email: inviteEmail,
      link: window.location.origin + '/ajouterdemande',
    };
    emailjs.send('service_aznzxvf', 'template_0v0ot6g', templateParams, 'yH6GCY4CHdeNhXs6t')
      .then(() => {
        alert(`Un email d'invitation a été envoyé à ${inviteEmail} avec le lien vers la page de demande d'accès.`);
        setShowInvitePopup(false);
        setInviteSent(false);
        setInviteEmail('');
      })
      .catch((error) => {
        alert("Erreur lors de l'envoi de l'invitation : " + error.text);
        setInviteSent(false);
      });
  }
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

  // Handler for access type change
  function handleAccessTypeChange(e) {
    const value = e.target.value;
    setAccessType(value);
    // No redirect; stay on the same form for both access types
  }

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
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", borderBottom: "1px solid #f3f3f3", color: "#333", fontSize: "1rem" }}>
                        <i className="bi bi-person-plus fs-5 me-2" style={{ color: '#1f77b4' }}></i>
                        Ajouter une demande d'acces
                      </li>
                      <li style={{ display: "flex", alignItems: "center", padding: "10px 18px", cursor: "pointer", color: "#333", fontSize: "1rem" }} onClick={() => navigate('/listdemandes')}>
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
                    <h1 className="fw-bold fs-3">Ajouter une demande d'accès</h1>
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
                {/* ...existing code... */}
                {/* Form for Ajouter une demande d'accès */}
                <Row className="justify-content-center">
                  <Col md={12}>
                    <Card className="shadow-sm" style={{ borderRadius: '18px', border: 'none', background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)' }}>
                      <Card.Body>
                        <div className="text-center mb-4">
                          <h2 className="fw-bold mt-2" style={{ color: '#003b8e', letterSpacing: '1px' }}>PROCEDURE D'ACCÈS AU SITE</h2>
                          <div className="text-secondary">Renseignez les informations ci-dessous pour demander l'accès au site</div>
                        </div>
                        {/* ...existing code... */}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                          <fieldset className="border rounded p-3 mb-4" style={{ background: '#f8fafc' }}>
                            <legend className="fw-bold" style={{ color: '#003b8e' }}>Information Personnelle</legend>
                            {/* Access Type Radio Buttons - now inside Information Personnelle */}
                            <div className="mb-3 d-flex gap-4 align-items-center justify-content-center">
                              <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="accessType" id="accessTypeTemporary" value="temporary" checked={accessType === 'temporary'} onChange={handleAccessTypeChange} />
                                <label className="form-check-label fw-semibold" htmlFor="accessTypeTemporary">Accès Provisoir / Visiteur</label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="accessType" id="accessTypePermanent" value="permanent" checked={accessType === 'permanent'} onChange={handleAccessTypeChange} />
                                <label className="form-check-label fw-semibold" htmlFor="accessTypePermanent">Accès permanent</label>
                              </div>
                            </div>
                            <Row className="mb-3">
                              <Col md={4}><label className="form-label">Nom <span className="text-danger">*</span></label><input type="text" className="form-control" name="nom" value={form.nom} onChange={handleChange} required /></Col>
                              <Col md={4}><label className="form-label">Prénom <span className="text-danger">*</span></label><input type="text" className="form-control" name="prenom" value={form.prenom} onChange={handleChange} required /></Col>
                              <Col md={4}><label className="form-label">Cin / Passport <span className="text-danger">*</span></label><input type="text" className="form-control" name="cin" value={form.cin} onChange={handleChange} required /></Col>
                            </Row>
                            <Row className="mb-3">
                              <Col md={4}><label className="form-label">Société <span className="text-danger">*</span></label><input type="text" className="form-control" name="societe" value={form.societe} onChange={handleChange} required /></Col>
                              <Col md={4}><label className="form-label">Statut <span className="text-danger">*</span></label><input type="text" className="form-control" name="statut" value={form.statut} onChange={handleChange} required /></Col>
                              <Col md={4}><label className="form-label">Mission <span className="text-danger">*</span></label><input type="text" className="form-control" name="mission" value={form.mission} onChange={handleChange} required /></Col>
                            </Row>
                            <Row className="mb-3">
                              <Col md={4}><label className="form-label">Projet <span className="text-danger">*</span></label><select className="form-select" name="projet" value={form.projet} onChange={handleChange} required><option value="">Sélectionner un projet</option><option value="Projet 1">Projet 1</option><option value="Projet 2">Projet 2</option><option value="Projet 3">Projet 3</option></select></Col>
                              <Col md={4}><label className="form-label">Date de début <span className="text-danger">*</span></label><input type="date" className="form-control" name="dateDebut" value={form.dateDebut} onChange={handleChange} required /></Col>
                              <Col md={4}><label className="form-label">Date de fin <span className="text-danger">*</span></label><input type="date" className="form-control" name="dateFin" value={form.dateFin} onChange={handleChange} required /></Col>
                            </Row>
                            <Row className="mb-3">
                              <Col md={4}><label className="form-label">Téléphone <span className="text-danger">*</span></label><input type="text" className="form-control" name="telephone" value={form.telephone} onChange={handleChange} required /></Col>
                              <Col md={4}><label className="form-label">Nationalité <span className="text-danger">*</span></label><select className="form-select" name="nationalite" value={form.nationalite} onChange={handleChange} required><option value="Marocain">Marocain</option><option value="Français">Français</option><option value="Autre">Autre</option></select></Col>
                            </Row>
                            {/* For permanent access, group all uploads together below phone/nationality, aligned left */}
                            {accessType === 'permanent' && (
                              <div>
                                <div className="row mb-3">
                                  <div className="col-md-4">
                                    <div className="mt-2">
                                      <label className="form-label fw-bold">Documents à fournir (obligatoires)</label>
                                      <div className="mb-3">
                                        <label className="form-label">Copie de la pièce d'identité <span className="text-muted" style={{ fontSize: '0.9em' }}>(Formats autorisés: JPG, PNG, max 2Mo)</span></label>
                                        <input type="file" className="form-control" name="copieCin" onChange={handleFileChange} />
                                        {cinError && <div className="text-danger mt-1" style={{ fontSize: '0.95em' }}>{cinError}</div>}
                                        {showDocChecker && cinFile && (
                                          <DocChecker
                                            file={cinFile}
                                            onResult={result => {
                                              setDocCheckerResult(result);
                                              // No validation or error logic here; DocChecker handles everything
                                            }}
                                            mode="cin"
                                          />
                                        )}
                                      </div>
                                      <div className="mb-3">
                                        <label className="form-label">Fiche anthropométrique</label>
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="ficheAnthropometrique"
                                          accept="image/*,.pdf"
                                          onChange={e => {
                                            const file = e.target.files[0];
                                            setFicheFile(file || null);
                                          }}
                                        />
                                        {ficheFile && (
                                          <DocChecker file={ficheFile} onResult={setFicheResult} mode="fiche" />
                                        )}
                                      </div>
                                      <div className="mb-3">
                                        <label className="form-label">Certificat d'aptitude physique</label>
                                        <input type="file" className="form-control" name="certificatAptitude" accept="image/*,.pdf" />
                                      </div>
                                      <div className="mb-3">
                                        <label className="form-label">Déclaration CNSS</label>
                                        <input type="file" className="form-control" name="declarationCNSS" accept="image/*,.pdf" />
                                      </div>
                                      <div className="mb-3">
                                        <label className="form-label">Photo personnelle</label>
                                        <input type="file" className="form-control" name="photoPersonnelle" accept="image/*" />
                                      </div>
                                      <div className="mb-3">
                                        <label className="form-label">Liste du matériel</label>
                                        <input type="file" className="form-control" name="listeMateriel" accept="image/*,.pdf" />
                                      </div>
                                      <div className="mb-3">
                                        <label className="form-label">Liste du personnel</label>
                                        <input type="file" className="form-control" name="listePersonnel" accept="image/*,.pdf" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <div className="col-md-12">
                                    <fieldset className="border rounded p-3" style={{ background: '#f4f7fb' }}>
                                      <legend className="fw-bold" style={{ color: '#003b8e' }}>Véhicules / Engins à déclarer</legend>
                                      {permanentVehicles.map((veh, idx) => (
                                        <Row className="mb-2" key={idx}>
                                          <Col md={2}>
                                            <label className="form-label">Type <span className="text-danger">*</span></label>
                                            <select className="form-select" value={veh.type} onChange={e => handlePermanentVehicleChange(idx, 'type', e.target.value)} required>
                                              <option value="">Sélectionner le type</option>
                                              <option value="Voiture">Voiture</option>
                                              <option value="Portchart">Portchart</option>
                                              <option value="Grue">Grue</option>
                                              <option value="Speed Boat">Speed Boat</option>
                                            </select>
                                          </Col>
                                          <Col md={2}>
                                            <label className="form-label">Marque <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={veh.marque} onChange={e => handlePermanentVehicleChange(idx, 'marque', e.target.value)} required />
                                          </Col>
                                          <Col md={2}>
                                            <label className="form-label">Modèle <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={veh.modele} onChange={e => handlePermanentVehicleChange(idx, 'modele', e.target.value)} required />
                                          </Col>
                                          <Col md={2}>
                                            <label className="form-label">Matricule <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={veh.matricule} onChange={e => handlePermanentVehicleChange(idx, 'matricule', e.target.value)} required />
                                          </Col>
                                          <Col md={2}>
                                            <label className="form-label">Couleur <span className="text-danger">*</span></label>
                                            <input type="text" className="form-control" value={veh.color} onChange={e => handlePermanentVehicleChange(idx, 'color', e.target.value)} required />
                                          </Col>
                                          <Col md={2} className="d-flex align-items-end">
                                            {permanentVehicles.length > 1 && (
                                              <button type="button" className="btn btn-danger btn-sm me-2" onClick={() => handleRemovePermanentVehicle(idx)} title="Supprimer">
                                                <i className="bi bi-trash"></i>
                                              </button>
                                            )}
                                          </Col>
                                          <Col md={3} className="mt-2">
                                            <label className="form-label">Permis de conduire <span className="text-danger">*</span></label>
                                            <input type="file" className="form-control" accept="image/*,.pdf" onChange={e => handlePermanentVehicleFileChange(idx, 'permis', e.target.files[0])} required />
                                          </Col>
                                          <Col md={3} className="mt-2">
                                            <label className="form-label">Papiers du véhicule <span className="text-danger">*</span></label>
                                            <input type="file" className="form-control" accept="image/*,.pdf" onChange={e => handlePermanentVehicleFileChange(idx, 'papiers', e.target.files[0])} required />
                                          </Col>
                                        </Row>
                                      ))}
                                      <div className="d-flex justify-content-end">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={handleAddPermanentVehicle}>
                                          <i className="bi bi-plus-lg"></i> Ajouter un véhicule/engin
                                        </button>
                                      </div>
                                    </fieldset>
                                  </div>
                                </div>
                              </div>
                            )}
                          </fieldset>
                          {/* Show car, object, and terms only for temporary access */}
                          {accessType === 'temporary' && (
                            <React.Fragment>
                              {/* Car ownership question */}
                              <fieldset className="border rounded p-3 mb-4" style={{ background: '#f4f7fb' }}>
                                <legend className="fw-bold" style={{ color: '#003b8e' }}>Avez-vous une voiture ?</legend>
                                <div className="d-flex align-items-center gap-4 mb-3">
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="voiture" id="voitureOui" value="Oui" checked={form.voiture === 'Oui'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="voitureOui">Oui</label>
                                  </div>
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="voiture" id="voitureNon" value="Non" checked={form.voiture === 'Non'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="voitureNon">Non</label>
                                  </div>
                                </div>
                                {form.voiture === 'Oui' && (
                                  <React.Fragment>
                                    {temporaryCars.map((car, idx) => (
                                      <Row className="mb-3" key={idx}>
                                        <Col md={3}>
                                          <label className="form-label">Marque</label>
                                          <select className="form-select" value={car.marque} onChange={e => handleTemporaryCarChange(idx, 'marque', e.target.value)}>
                                            <option value="">Sélectionner la marque</option>
                                            <option value="Renault">Renault</option>
                                            <option value="Peugeot">Peugeot</option>
                                            <option value="Citroën">Citroën</option>
                                            <option value="Dacia">Dacia</option>
                                            <option value="Autre">Autre</option>
                                          </select>
                                        </Col>
                                        <Col md={3}>
                                          <label className="form-label">Modèle</label>
                                          <select className="form-select" value={car.modele} onChange={e => handleTemporaryCarChange(idx, 'modele', e.target.value)}>
                                            <option value="">Sélectionner le modèle</option>
                                            <option value="Clio">Clio</option>
                                            <option value="208">208</option>
                                            <option value="C3">C3</option>
                                            <option value="Logan">Logan</option>
                                            <option value="Autre">Autre</option>
                                          </select>
                                        </Col>
                                        <Col md={3}>
                                          <label className="form-label">Matricule <span className="text-danger">*</span></label>
                                          <input type="text" className="form-control" value={car.matricule} onChange={e => handleTemporaryCarChange(idx, 'matricule', e.target.value)} required placeholder="Matricule" />
                                        </Col>
                                        <Col md={2}>
                                          <label className="form-label">Coleur</label>
                                          <input type="text" className="form-control" value={car.color} onChange={e => handleTemporaryCarChange(idx, 'color', e.target.value)} placeholder="Coleur" />
                                        </Col>
                                        <Col md={1} className="d-flex align-items-end">
                                          {temporaryCars.length > 1 && (
                                            <button type="button" className="btn btn-danger btn-sm me-2" onClick={() => handleRemoveTemporaryCar(idx)} title="Supprimer">
                                              <i className="bi bi-trash"></i>
                                            </button>
                                          )}
                                        </Col>
                                      </Row>
                                    ))}
                                    <div className="d-flex justify-content-end">
                                      <button type="button" className="btn btn-primary btn-sm" onClick={handleAddTemporaryCar}>
                                        <i className="bi bi-plus-lg"></i> Ajouter une voiture
                                      </button>
                                    </div>
                                  </React.Fragment>
                                )}
                              </fieldset>
                              {/* Bringing items question */}
                              <fieldset className="border rounded p-3 mb-4" style={{ background: '#f4f7fb' }}>
                                <legend className="fw-bold" style={{ color: '#003b8e' }}>Apportez-vous quelque chose ?</legend>
                                <div className="d-flex align-items-center gap-4 mb-3">
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="apport" id="apportOui" value="Oui" checked={form.apport === 'Oui'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="apportOui">Oui</label>
                                  </div>
                                  <div className="form-check">
                                    <input className="form-check-input" type="radio" name="apport" id="apportNon" value="Non" checked={form.apport === 'Non'} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="apportNon">Non</label>
                                  </div>
                                </div>
                                {form.apport === 'Oui' && (
                                  <React.Fragment>
                                    {temporaryObjects.map((obj, idx) => (
                                      <Row className="mb-3" key={idx}>
                                        <Col md={7} className="d-flex align-items-end gap-2">
                                          <div style={{ flex: 1 }}>
                                            <label className="form-label">Type d'objet</label>
                                            <select className="form-select" value={obj.objetType} onChange={e => handleTemporaryObjectChange(idx, 'objetType', e.target.value)}>
                                              <option value="">Sélectionner le bien</option>
                                              <option value="Ordinateur">Ordinateur</option>
                                              <option value="Téléphone">Téléphone</option>
                                              <option value="Outil">Outil</option>
                                              <option value="Autre">Autre</option>
                                            </select>
                                          </div>
                                          {obj.objetType === 'Autre' && (
                                            <div style={{ flex: 1 }}>
                                              <label className="form-label">&nbsp;</label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Précisez l'objet"
                                                value={obj.autreObjet || ''}
                                                onChange={e => handleTemporaryObjectChange(idx, 'autreObjet', e.target.value)}
                                              />
                                            </div>
                                          )}
                                        </Col>
                                        {/* Commentaire field removed as requested */}
                                        <Col md={1} className="d-flex align-items-end">
                                          {temporaryObjects.length > 1 && (
                                            <button type="button" className="btn btn-danger btn-sm me-2" onClick={() => handleRemoveTemporaryObject(idx)} title="Supprimer">
                                              <i className="bi bi-trash"></i>
                                            </button>
                                          )}
                                        </Col>
                                      </Row>
                                    ))}
                                    <div className="d-flex justify-content-end">
                                      <button type="button" className="btn btn-primary btn-sm" onClick={handleAddTemporaryObject}>
                                        <i className="bi bi-plus-lg"></i> Ajouter un objet
                                      </button>
                                    </div>
                                  </React.Fragment>
                                )}
                              </fieldset>
                              {/* New fields for CIN and personal photo upload for temporary access */}
                              <fieldset className="border rounded p-3 mb-4" style={{ background: '#f4f7fb' }}>
                                <legend className="fw-bold" style={{ color: '#003b8e' }}>Documents à fournir</legend>
                                <Row className="mb-3">
                                  <Col md={6}>
                                    <label className="form-label">Copie de la pièce d'identité (CIN ou Passeport) <span className="text-danger">*</span></label>
                                    <input type="file" className="form-control" name="cinTemporaire" accept="image/*,.pdf" required />
                                  </Col>
                                  <Col md={6}>
                                    <label className="form-label">Photo personnelle <span className="text-danger">*</span></label>
                                    <input type="file" className="form-control" name="photoTemporaire" accept="image/*" required />
                                  </Col>
                                </Row>
                              </fieldset>
                              {/* Terms acceptance */}
                              <div className="form-check mb-4">
                                <input className="form-check-input" type="checkbox" id="acceptTerms" name="acceptTerms" checked={form.acceptTerms || false} onChange={e => setForm(prev => ({ ...prev, acceptTerms: e.target.checked }))} required />
                                <label className="form-check-label" htmlFor="acceptTerms">J'ai lu et j'accepte les conditions d'utilisation</label>
                              </div>
                            </React.Fragment>
                          )}
                          {/* Action buttons */}
                          <div className="d-flex justify-content-end gap-3">
                            <button type="button" className="btn" style={{ background: '#e0e7ff', color: '#003b8e', border: '1px solid #003b8e' }} onClick={() => navigate('/dashboard')}>Annuler</button>
                            <button type="submit" className="btn" style={{ background: '#003b8e', color: '#fff', border: 'none' }}>Valider</button>
                            <button type="button" className="btn" style={{ background: '#00bfff', color: '#fff', border: 'none' }} onClick={() => setShowInvitePopup(true)}>Invitation</button>
                          </div>
                          {showInvitePopup && (
                            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,59,142,0.12)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <div style={{ background: 'linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,59,142,0.18)', padding: '32px', minWidth: '340px', position: 'relative', border: '1px solid #003b8e' }}>
                                <button style={{ position: 'absolute', top: 12, right: 16, border: 'none', background: 'none', fontSize: '1.5rem', color: '#003b8e' }} onClick={() => setShowInvitePopup(false)}>&times;</button>
                                <h4 className="fw-bold mb-3" style={{ color: '#003b8e' }}>Envoyer une invitation</h4>
                                <div className="mb-3">
                                  <label className="form-label">Email du destinataire</label>
                                  <input type="email" className="form-control" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="exemple@email.com" required />
                                </div>
                                <button className="btn w-100" style={{ background: '#00bfff', color: '#fff', border: 'none' }} disabled={!inviteEmail || inviteSent} onClick={handleSendInvitation}>
                                  {inviteSent ? 'Envoi...' : 'Envoyer'}
                                </button>
                              </div>
                            </div>
                          )}
                        </form>
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

export default AjouterDemande;
