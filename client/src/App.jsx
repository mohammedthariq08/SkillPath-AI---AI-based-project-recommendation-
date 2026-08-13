import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import History from './pages/History.jsx';
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <header className="navbar">
                <Link to="/dashboard" className="brand">SkillPath AI</Link>
                <nav>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/history">History</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            </header>

            <main className="app-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/history" element={<History />} />
                    <Route path="*" element={<p>Page not found</p>} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;