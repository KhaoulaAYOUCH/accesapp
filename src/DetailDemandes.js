import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import demandesData from "./demandesData";

function DetailDemandes() {
  const { code } = useParams();
  const demande = demandesData.find((d) => d.code === code);
  const [reminderSent, setReminderSent] = useState(false);

  const handleReminderClick = () => {
    setReminderSent(true);
    // You can add logic here to send a reminder (API call, etc.)
    setTimeout(() => setReminderSent(false), 3000); // Hide after 3s
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #e0e7ff 0%, #f7f9fc 100%)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card style={{ borderRadius: '24px', boxShadow: '0 4px 24px rgba(0,59,142,0.08)', marginTop: '40px', background: 'linear-gradient(180deg, #f7f9fc 0%, #eef2f7 100%)', border: 'none' }}>
              <Card.Body>
                {/* Centered badge inside Card.Body */}
                <div className="d-flex flex-column align-items-center mb-4" style={{ gap: '18px' }}>
                  <div className="d-flex align-items-center justify-content-center w-100" style={{ gap: '18px' }}>
                    {demande && demande.statut === 'Validé' ? (
                      <span style={{ background: '#22c55e', color: '#fff', fontWeight: 700, fontSize: '1rem', padding: '6px 18px', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', textAlign: 'center', gap: '8px', boxShadow: '0 2px 8px rgba(34,197,94,0.10)' }}>
                        Validé
                      </span>
                    ) : demande && demande.statut === 'En attente' ? (
                      <span style={{ background: '#fde047', color: '#222', fontWeight: 700, fontSize: '1rem', padding: '6px 18px', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', textAlign: 'center', gap: '8px', boxShadow: '0 2px 8px rgba(253,224,71,0.10)' }}>
                        En attente{demande.approbateur && (<span style={{ fontWeight: 700, color: '#003b8e', fontSize: '0.95rem' }}> - Approver: <span style={{ textDecoration: 'underline', color: '#003b8e' }}>{demande.approbateur}</span></span>)}
                        <span
                          title="Envoyer un rappel à l'approbateur"
                          style={{ marginLeft: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                          onClick={handleReminderClick}
                        >
                          <i className="bi bi-bell" style={{ fontSize: '1.2em', color: '#003b8e', verticalAlign: 'middle' }}></i>
                        </span>
                      </span>
                    ) : demande && demande.statut === 'Refusé' ? (
                      <span style={{ background: '#ef4444', color: '#fff', fontWeight: 700, fontSize: '1rem', padding: '6px 18px', borderRadius: '16px', display: 'inline-flex', alignItems: 'center', textAlign: 'center', gap: '8px', boxShadow: '0 2px 8px rgba(239,68,68,0.10)' }}>
                        Refusé
                        {demande.cause && (
                          <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}> - Cause: <span style={{ textDecoration: 'underline', color: '#fff' }}>{demande.cause}</span></span>
                        )}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="fw-bold mb-4" style={{ color: '#003b8e', fontSize: '1.7rem', letterSpacing: '0.01em', textAlign: 'center', fontFamily: 'inherit', textShadow: '0 2px 8px rgba(0,59,142,0.08)' }}>Détails de la demande</div>
                {demande ? (
                  <div style={{ background: 'rgba(255,255,255,0.85)', borderRadius: '18px', padding: '2.5rem 2rem', marginTop: '1.5rem', boxShadow: '0 2px 12px rgba(0,59,142,0.06)' }}>
                    {demande.statut === 'En attente' && reminderSent && (
                      <div className="d-flex justify-content-center mb-2">
                        <span style={{ color: '#003b8e', fontWeight: 700, fontSize: '1.1rem', background: '#e0e7ff', borderRadius: '12px', padding: '6px 18px' }}>
                          Rappel envoyé à l'approbateur !
                        </span>
                      </div>
                    )}
                    <div className="fw-bold mb-3" style={{ color: '#003b8e', fontSize: '1.15rem', letterSpacing: '0.01em', fontFamily: 'inherit' }}>Information Personnelle</div>
                    <div>
                      {demande.typeAcces && (
                        <div className="mb-4" style={{ textAlign: 'center' }}>
                          <span style={{ display: 'inline-block', background: '#e0e7ff', color: '#003b8e', fontWeight: 700, fontSize: '1.15rem', borderRadius: '16px', padding: '10px 32px', boxShadow: '0 2px 8px rgba(0,59,142,0.08)', letterSpacing: '0.02em' }}>
                            Type d'accès : {demande.typeAcces}
                          </span>
                        </div>
                      )}
                      {demande.nom && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="nom" style={{ color: '#003b8e', fontWeight: 600 }}>Nom</label><input type="text" id="nom" className="form-control" value={demande.nom} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.prenom && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="prenom" style={{ color: '#003b8e', fontWeight: 600 }}>Prénom</label><input type="text" id="prenom" className="form-control" value={demande.prenom} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.cin && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="cin" style={{ color: '#003b8e', fontWeight: 600 }}>Cin / Passport</label><input type="text" id="cin" className="form-control" value={demande.cin} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.societe && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="societe" style={{ color: '#003b8e', fontWeight: 600 }}>Société</label><input type="text" id="societe" className="form-control" value={demande.societe} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.demandeur && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="demandeur" style={{ color: '#003b8e', fontWeight: 600 }}>Demandeur</label><input type="text" id="demandeur" className="form-control" value={demande.demandeur} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.telephone && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="telephone" style={{ color: '#003b8e', fontWeight: 600 }}>Téléphone</label><input type="text" id="telephone" className="form-control" value={demande.telephone} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.typeAcces && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="typeAcces" style={{ color: '#003b8e', fontWeight: 600 }}>Type d'accès</label><input type="text" id="typeAcces" className="form-control" value={demande.typeAcces} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.approbateur && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="approbateur" style={{ color: '#003b8e', fontWeight: 600 }}>Approbateur</label><input type="text" id="approbateur" className="form-control" value={demande.approbateur} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.cause && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="cause" style={{ color: '#003b8e', fontWeight: 600 }}>Cause</label><input type="text" id="cause" className="form-control" value={demande.cause} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.mission && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="mission" style={{ color: '#003b8e', fontWeight: 600 }}>Mission</label><input type="text" id="mission" className="form-control" value={demande.mission} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.projet && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="projet" style={{ color: '#003b8e', fontWeight: 600 }}>Projet</label><input type="text" id="projet" className="form-control" value={demande.projet} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.dateDebut && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="dateDebut" style={{ color: '#003b8e', fontWeight: 600 }}>Date début</label><input type="text" id="dateDebut" className="form-control" value={demande.dateDebut} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.dateFin && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="dateFin" style={{ color: '#003b8e', fontWeight: 600 }}>Date fin</label><input type="text" id="dateFin" className="form-control" value={demande.dateFin} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.nationalite && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="nationalite" style={{ color: '#003b8e', fontWeight: 600 }}>Nationalité</label><input type="text" id="nationalite" className="form-control" value={demande.nationalite} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.voiture && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="voiture" style={{ color: '#003b8e', fontWeight: 600 }}>Voiture</label><input type="text" id="voiture" className="form-control" value={demande.voiture} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.marque && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="marque" style={{ color: '#003b8e', fontWeight: 600 }}>Marque</label><input type="text" id="marque" className="form-control" value={demande.marque} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.modele && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="modele" style={{ color: '#003b8e', fontWeight: 600 }}>Modèle</label><input type="text" id="modele" className="form-control" value={demande.modele} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.matricule && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="matricule" style={{ color: '#003b8e', fontWeight: 600 }}>Matricule</label><input type="text" id="matricule" className="form-control" value={demande.matricule} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.color && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="color" style={{ color: '#003b8e', fontWeight: 600 }}>Couleur</label><input type="text" id="color" className="form-control" value={demande.color} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.apport && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="apport" style={{ color: '#003b8e', fontWeight: 600 }}>Apport d'objet</label><input type="text" id="apport" className="form-control" value={demande.apport} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.objetType && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="objetType" style={{ color: '#003b8e', fontWeight: 600 }}>Type d'objet</label><input type="text" id="objetType" className="form-control" value={demande.objetType} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.commentaire && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="commentaire" style={{ color: '#003b8e', fontWeight: 600 }}>Commentaire</label><input type="text" id="commentaire" className="form-control" value={demande.commentaire} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                      {demande.acceptTerms !== undefined && (
                        <div className="mb-3"><label className="fw-semibold mb-1" htmlFor="acceptTerms" style={{ color: '#003b8e', fontWeight: 600 }}>Accepté les termes</label><input type="text" id="acceptTerms" className="form-control" value={demande.acceptTerms ? 'Oui' : 'Non'} readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-danger">Aucune demande trouvée pour ce code.</div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailDemandes;