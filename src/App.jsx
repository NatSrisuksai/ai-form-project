import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/components/Instructor/Question Page/Question';
import Response from './pages/components/Instructor/Response Page/Response'; 
import Overview_page from './pages/components/Instructor/Question Page/overview question/Overview_page';
import Deeply_overview from './pages/components/Instructor/Question Page/overview question/Deeply_overview';
import StudentQuestion from './pages/components/Student/Student Question Page/StudentQuestion';
import StudentResult from './pages/components/Student/Student Result Page/StudentResult';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/overview/:questionId" element={<Overview_page />} />
          <Route path="/deeply_overview" element={<Deeply_overview />} />
          <Route path="/responses" element={<Response />} />
          <Route path="/studentQuestion/:examID" element={<StudentQuestion />} /> 
          <Route path="/studentResult/:examID/:userID" element={<StudentResult />} /> 
        </Routes>
      </div>
    </Router>
  );
}