import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Diseases from './pages/Diseases';
import Prediction from './pages/Prediction';
import About from './pages/About';
import './index.css'; // Cambiar esta línea

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enfermedades" element={<Diseases />} />
          <Route path="/prediccion" element={<Prediction />} />
          <Route path="/nosotros" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;