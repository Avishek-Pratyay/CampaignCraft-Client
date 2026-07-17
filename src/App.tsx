import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Landing from './pages/Landing';
import Explore from './pages/Explore';
import CampaignDetails from './pages/CampaignDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCampaign from './pages/AddCampaign';
import ManageCampaigns from './pages/ManageCampaigns';
import ContentGenerator from './pages/ContentGenerator';
import DataAnalyzer from './pages/DataAnalyzer';
import About from './pages/About';
import Contact from './pages/Contact';

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-brand-dark">
          {/* Sticky Navbar */}
          <Navbar />

          {/* Core Content View wrapped in ErrorBoundary to catch render crashes */}
          <main className="flex-grow">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/explore/:id" element={<CampaignDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/generator" element={<ContentGenerator />} />
                <Route path="/analyzer" element={<DataAnalyzer />} />
                <Route path="/items/add" element={<AddCampaign />} />
                <Route path="/items/manage" element={<ManageCampaigns />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </ErrorBoundary>
          </main>

          {/* Core Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};
export default App;
