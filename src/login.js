import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Veuillez remplir les deux champs.");
      return;
    }
    setError("");
    navigate("/dashboard");
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center px-2" style={{background: "linear-gradient(90deg, #003b8e 0%, #4ca1af 100%)"}}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} sm={10} md={8} lg={5} xl={4} className="d-flex align-items-center justify-content-center">
          <Card className="p-3 p-sm-4 shadow-lg rounded-4 border-0 w-100" style={{maxWidth: '400px'}}>
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="mb-3 w-100 d-flex justify-content-center">
                <img src={require('./LOGOJESA.jpg')} alt="JESA Logo" style={{height: '48px', maxWidth: '80%'}} />
              </div>
              <h2 className="fs-5 fw-semibold text-primary mb-4 text-center">Connexion à la plateforme</h2>
              {error && <Alert variant="danger" className="w-100 text-center py-2">{error}</Alert>}
              <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nom d'utilisateur"
                    required
                    size="lg"
                    className="py-2"
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="password">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    required
                    size="lg"
                    className="py-2"
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100 fw-bold py-2 rounded-3" size="lg">
                  Connexion
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
