import React from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";

const STATUS_OPTIONS = [
  { value: "OnHold", label: "On Hold" },
  { value: "Active", label: "Active" },
  { value: "Closed", label: "Closed" },
];

function getStatusLabel(statusValue) {
  const found = STATUS_OPTIONS.find(opt => opt.value === statusValue);
  return found ? found.label : statusValue;
}

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

function DetailProjet() {
  const { projectNumber } = useParams();
  const project = getProjects().find(p => p.projectNumber === projectNumber);

  if (!project) {
    return (
      <Container className="py-5">
        <h2>Project not found</h2>
        <Button variant="primary" onClick={() => window.history.back()}>Back</Button>
      </Container>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg" style={{ borderRadius: 18 }}>
              <div style={{ height: 220, overflow: "hidden", borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                <Card.Img
                  variant="top"
                  src={project.image}
                  alt={project.projectName}
                  style={{ height: 220, objectFit: "cover", borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
                />
              </div>
              <Card.Body>
                <div className="text-center mb-4">
                  <h2 className="fw-bold" style={{ color: '#003b8e', letterSpacing: '1px' }}>Nouveau Port de Laayoune</h2>
                </div>
                {/* Données du Projet */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: '#222', letterSpacing: '0.5px', fontSize: '1.15rem', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'inherit' }}>Données du Projet</h5>
                  <Card className="mb-4" style={{ borderRadius: '18px', border: 'none', background: '#f7f9fc', boxShadow: '0 2px 12px rgba(0,59,142,0.06)' }}>
                    <Card.Body>
                      <Row>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Project Name</label><input type="text" className="form-control" value="Nouveau Port de Laayoune" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Project Number</label><input type="text" className="form-control" value="DBP19021" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                    {/* Date de début */}
                    <Col md={6} className="mb-3">
                      <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Date de début</label><input type="date" className="form-control" value="2025-07-01" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                    </Col>
                    {/* Date de fin prévisionnelle */}
                    <Col md={6} className="mb-3">
                      <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Date de fin prévisionnelle</label><input type="date" className="form-control" value="2026-06-30" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                    </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>BU</label><input type="text" className="form-control" value="Building" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Sector</label><input type="text" className="form-control" value="Building" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Program</label><input type="text" className="form-control" value="Port Program" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Project Size</label><input type="text" className="form-control" value="Large" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Status</label><input type="text" className="form-control" value="Active" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
                {/* Localisation */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: '#222', letterSpacing: '0.5px', fontSize: '1.15rem', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'inherit' }}>Localisation</h5>
                  <Card className="mb-4" style={{ borderRadius: '18px', border: 'none', background: '#f7f9fc', boxShadow: '0 2px 12px rgba(0,59,142,0.06)' }}>
                    <Card.Body>
                      <Row>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Home Office</label><input type="text" className="form-control" value="Casablanca" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Site Location</label><input type="text" className="form-control" value="Laayoune" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
                {/* Work Orders */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: '#222', letterSpacing: '0.5px', fontSize: '1.15rem', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'inherit' }}>Work Orders</h5>
                  <Card className="mb-4" style={{ borderRadius: '18px', border: 'none', background: '#f7f9fc', boxShadow: '0 2px 12px rgba(0,59,142,0.06)' }}>
                    <Card.Body>
                      <Row>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Work Order Number</label><input type="text" className="form-control" value="WO-001" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Work Order Type</label><input type="text" className="form-control" value="Cost Fee" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
                {/* Membres du projet */}
                <div className="mb-4">
                  <h5 className="fw-semibold mb-3" style={{ color: '#222', letterSpacing: '0.5px', fontSize: '1.15rem', textTransform: 'uppercase', fontWeight: 700, fontFamily: 'inherit' }}>Membres du projet</h5>
                  <Card className="mb-4" style={{ borderRadius: '18px', border: 'none', background: '#f7f9fc', boxShadow: '0 2px 12px rgba(0,59,142,0.06)' }}>
                    <Card.Body>
                      <Row>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Project Manager</label><input type="text" className="form-control" value="John Doe" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Construction Manager</label><input type="text" className="form-control" value="Jane Smith" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>HSE Manager</label><input type="text" className="form-control" value="Ali Ben" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Quality Manager</label><input type="text" className="form-control" value="Sara Lee" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                        <Col md={6} className="mb-3">
                          <div className="mb-3"><label className="fw-semibold mb-1" style={{ color: '#003b8e', fontWeight: 600 }}>Field Services Coordinator</label><input type="text" className="form-control" value="Khaoula Ayouch" readOnly style={{ background: '#f7f9fc', border: '1px solid #e0e7ff', borderRadius: '12px', fontWeight: '500', color: '#003b8e', fontSize: '1rem', boxShadow: '0 1px 4px rgba(0,59,142,0.04)', padding: '10px 16px' }} /></div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
                <div className="mt-4">
                  <Button variant="secondary" onClick={() => window.history.back()}>Retour</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailProjet;
