import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function MonProfile() {
  // Logout handler: clear localStorage/session and redirect
  const handleLogout = () => {
    localStorage.clear();
    if (window.sessionStorage) window.sessionStorage.clear();
    window.location.href = '/login';
  };
  // Use gender field for avatar icon
  const gender = "female"; // Change to "male" for men
  const [profileImage, setProfileImage] = React.useState(() => {
    return localStorage.getItem('profileImage') || null;
  });
  const fileInputRef = React.useRef();

  React.useEffect(() => {
    if (profileImage) {
      localStorage.setItem('profileImage', profileImage);
    } else {
      localStorage.removeItem('profileImage');
    }
  }, [profileImage]);
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(90deg, #e0e7ff 0%, #f8fafc 100%)" }}>
      <Container className="py-4">
        {/* Top section: avatar, name, status, role */}
        <Row className="justify-content-center mb-2">
          <Col md={10}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px rgba(0,59,142,0.08)', padding: '32px 32px 24px 32px', marginBottom: '8px' }}>
              {/* Avatar */}
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '4px solid #003b8e', marginBottom: '6px' }}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  gender === "female" ? (
                    <i id="profile-avatar" className="bi bi-person-fill" style={{ fontSize: '4.5rem', color: '#003b8e' }}></i>
                  ) : (
                    <i id="profile-avatar" className="bi bi-person-circle" style={{ fontSize: '4.5rem', color: '#003b8e' }}></i>
                  )
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '0px' }}>
                <button
                  onClick={() => fileInputRef.current.click()}
                  style={{ background: '#fff', border: '1px solid #003b8e', borderRadius: '50%', padding: '3px', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  title="Choisir une photo"
                >
                  <i className="bi bi-upload" style={{ color: '#003b8e', fontSize: '1rem' }}></i>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = ev => setProfileImage(ev.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {profileImage && (
                  <button
                    onClick={() => setProfileImage(null)}
                    style={{ background: '#fff', border: '1px solid #ef476f', borderRadius: '50%', padding: '3px', cursor: 'pointer', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    title="Supprimer la photo"
                  >
                    <i className="bi bi-trash" style={{ color: '#ef476f', fontSize: '1rem' }}></i>
                  </button>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <h2 className="fw-bold mb-0" style={{ color: '#003b8e', fontSize: '2rem' }}>Khaoula Ayouch</h2>
                </div>
                <div className="mt-1" style={{ color: '#4f8ecb', fontWeight: 500, fontSize: '1.1rem' }}>
                  Field Services Coordinator &bull; Constructability
                </div>
              </div>
              <div>
                {/* Logout icon button */}
                <button
                  className="btn"
                  style={{ background: 'none', border: 'none', color: 'rgba(239,71,111,0.7)', fontSize: '1.6rem', opacity: 0.7 }}
                  title="Se déconnecter"
                  onClick={handleLogout}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        {/* Contact info card */}
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="shadow-sm" style={{ borderRadius: '18px', background: '#f7f9fc' }}>
              <Card.Body>
                <div className="mb-4" style={{ fontWeight: 'bold', color: '#003b8e', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <i className="bi bi-info-circle" style={{ fontSize: '1.2em', color: '#003b8e' }}></i>
                  Informations de contact
                </div>
                <Row>
                  <Col md={6}>
                    <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="bi bi-person" style={{ color: '#4f8ecb', fontSize: '1.2em' }}></i>
                      <span><span className="fw-bold">Nom :</span> Khaoula Ayouch</span>
                    </div>
                    <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="bi bi-envelope" style={{ color: '#4f8ecb', fontSize: '1.2em' }}></i>
                      <span><span className="fw-bold">Email :</span> Khaoula.Ayouch@jesagroup.com</span>
                    </div>
                    <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="bi bi-geo-alt" style={{ color: '#4f8ecb', fontSize: '1.2em' }}></i>
                      <span><span className="fw-bold">Localisation :</span> Site Laayoune</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="bi bi-briefcase" style={{ color: '#4f8ecb', fontSize: '1.2em' }}></i>
                      <span><span className="fw-bold">Poste :</span> Field Services Coordinator</span>
                    </div>
                    <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="bi bi-telephone" style={{ color: '#4f8ecb', fontSize: '1.2em' }}></i>
                      <span><span className="fw-bold">Téléphone :</span> 06 60 49 76 72</span>
                    </div>
                    <div className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="bi bi-building" style={{ color: '#4f8ecb', fontSize: '1.2em' }}></i>
                      <span><span className="fw-bold">Entreprise :</span> JESA</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MonProfile;
