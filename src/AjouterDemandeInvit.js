
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import DocChecker from "./DocChecker";

function AjouterDemandeInvit() {
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
  const [cinError, setCinError] = React.useState("");
  const [cinFile, setCinFile] = React.useState(null);
  const [showDocChecker, setShowDocChecker] = React.useState(false);
  const [docCheckerResult, setDocCheckerResult] = React.useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  function handleAccessTypeChange(e) {
    setAccessType(e.target.value);
  }
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
    const requestNumber = Math.floor(100000 + Math.random() * 900000);
    alert(`Votre demande avec le numéro ${requestNumber} a été envoyée pour approbation.`);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)', position: 'relative' }}>
      <Container fluid className="min-vh-100 p-0" style={{ background: 'none' }}>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="shadow-sm" style={{ borderRadius: '18px', border: 'none', background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)' }}>
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="fw-bold mt-2" style={{ color: '#003b8e', letterSpacing: '1px' }}>PROCEDURE D'ACCÈS AU SITE</h2>
                  <div className="text-secondary">Renseignez les informations ci-dessous pour demander l'accès au site</div>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <fieldset className="border rounded p-3 mb-4" style={{ background: '#f8fafc' }}>
                    <legend className="fw-bold" style={{ color: '#003b8e' }}>Information Personnelle</legend>
                    <div className="mb-3 d-flex gap-4 align-items-center justify-content-center">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="accessType" id="accessTypeTemporary" value="temporary" checked={accessType === 'temporary'} onChange={handleAccessTypeChange} />
                        <label className="form-check-label fw-semibold" htmlFor="accessTypeTemporary">Accès Provisoir / visiteur</label>
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
                                {/* DocChecker logic omitted for invite version */}
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Fiche anthropométrique</label>
                                <input type="file" className="form-control" name="ficheAnthropometrique" accept="image/*,.pdf" />
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
                      {/* Terms acceptance */}
                      <div className="form-check mb-4">
                        <input className="form-check-input" type="checkbox" id="acceptTerms" name="acceptTerms" checked={form.acceptTerms || false} onChange={e => setForm(prev => ({ ...prev, acceptTerms: e.target.checked }))} required />
                        <label className="form-check-label" htmlFor="acceptTerms">J'ai lu et j'accepte les conditions d'utilisation</label>
                      </div>
                      {/* New fields for CIN and personal photo upload for temporary access */}
                      <fieldset className="border rounded p-3 mb-4" style={{ background: '#f4f7fb' }}>
                        <legend className="fw-bold" style={{ color: '#003b8e' }}>Documents à fournir</legend>
                        <Row className="mb-3">
                          <Col md={6}>
                            <label className="form-label">Copie de la pièce d'identité (CIN ou Passeport) <span className="text-danger">*</span></label>
                            <input type="file" className="form-control" name="cinTemporaire" accept="image/*,.pdf" required onChange={e => {
                              const file = e.target.files[0];
                              if (file) {
                                setCinError("");
                                setCinFile(file);
                                setShowDocChecker(true);
                              } else {
                                setCinError("");
                                setShowDocChecker(false);
                                setCinFile(null);
                              }
                            }} />
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
                          </Col>
                          <Col md={6}>
                            <label className="form-label">Photo personnelle <span className="text-danger">*</span></label>
                            <input type="file" className="form-control" name="photoTemporaire" accept="image/*" required />
                          </Col>
                        </Row>
                      </fieldset>
                    </React.Fragment>
                  )}
                  {/* Action buttons */}
                  <div className="d-flex justify-content-end gap-3">
                    <button type="submit" className="btn" style={{ background: '#003b8e', color: '#fff', border: 'none' }}>Valider</button>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AjouterDemandeInvit;
