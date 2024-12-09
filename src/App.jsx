import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/components/Instructor/Question Page/Question';
import Response from './pages/components/Instructor/Response Page/Response'; 
import Overview_page from './pages/components/Instructor/Question Page/overview question/Overview_page';
import Deeply_overview from './pages/components/Instructor/Question Page/overview question/Deeply_overview';
export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/overview" element={<Overview_page />} />
          <Route path="/deeply_overview" element={<Deeply_overview />} />
          <Route path="/responses" element={<Response />} /> 
        </Routes>
      </div>
    </Router>
  );
}