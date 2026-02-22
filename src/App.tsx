import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { History } from './pages/History';
import { Titles } from './pages/Titles';
import { Legends } from './pages/Legends';
import { Seasons } from './pages/Seasons';
import { Auth } from './pages/Auth';
import { Contribute } from './pages/Contribute';
import { Admin } from './pages/Admin';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-hebrew">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/titles" element={<Titles />} />
              <Route path="/legends" element={<Legends />} />
              <Route path="/seasons" element={<Seasons />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/contribute" element={<Contribute />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
