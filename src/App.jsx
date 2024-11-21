import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/components/Question Page/Question';
import Response from './pages/Response'; 
import Overview_page from './pages/components/Question Page/overview question/Overview_page';
export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/overview" element={<Overview_page />} />
          <Route path="/responses" element={<Response />} /> 
        </Routes>
      </div>
    </Router>
  );
}