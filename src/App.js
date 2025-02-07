import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp1 from "./pages/SignUp1";
import WorkerSignUp from "./pages/WorkerSignUp";
import CompanySignUp from "./pages/CompanySignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup1" element={<SignUp1 />} /> 
        <Route path="/WorkerSignUp" element={<WorkerSignUp />} /> 
        <Route path="/CompanySignUp" element={<CompanySignUp />} /> 
      </Routes>
    </Router>
  );
}

export default App;
