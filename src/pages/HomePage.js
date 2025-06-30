// 📁 src/pages/HomePage.js
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      
      {/* Main content placeholder (optional) */}
      <div style={{ flex: 1 }}>
        {/* You can add your content here if needed */}
      </div>
      
      <Footer />
    </div>
  );
}


export default HomePage;
