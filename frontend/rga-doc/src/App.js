// App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthUI from './AuthUI';
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthUI />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
