import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ flex: 1, padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
        <h1 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2rem', color: '#333' }}>Welcome to First Assembly(FAGCK) Cell Group!</h1>
        <p className="lead mb-4 fs-4 text-dark">Growing together in Christ and community.</p>

         <div className="d-flex justify-content-center flex-wrap mb-5 gap-4">
          <Link 
            to="/MembersPage" 
            className="btn px-5 py-3 fw-semibold border-0 shadow" 
            style={{ 
              borderRadius: '12px', 
              fontSize: '1.2rem', 
              backgroundColor: '#007bff', 
              color: '#fff', 
              transition: 'all 0.3s ease' 
            }}
          >
            View Members
          </Link>
          <Link 
            to="/AddMemberPage" 
            className="btn px-5 py-3 fw-semibold border-0 shadow" 
            style={{ 
              borderRadius: '12px', 
              fontSize: '1.2rem', 
              backgroundColor: '#28a745', 
              color: '#fff', 
              transition: 'all 0.3s ease' 
            }}
          >
            Add Member
          </Link>
        </div>

        <div className="mission-vision-container text-start mx-auto" style={{ maxWidth: 800, backgroundColor: '#ffffff', padding: '40px', borderRadius: '10px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
          <h2 className="text-center mb-4" style={{ fontWeight: 'bold', fontSize: '2rem', color: '#333' }}>Mission & Vision</h2>

          <section className="mission-section mb-4">
            <h4 className="section-heading" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Our Mission</h4>
            <p className="section-paragraph fs-5">To win souls and make disciples.</p>
          </section>

          <section className="vision-section">
            <h4 className="section-heading" style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Our Vision</h4>
            <p className="section-paragraph fs-5">To love God and love people.</p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
