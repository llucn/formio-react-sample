import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import FormioContrib from "@formio/contrib";
import { Formio } from 'formiojs';
import Navbar from './components/Navbar';
import FormContainer from './components/FormContainer';
import FormDesign from './components/FormDesign';
import FormSubmission from './components/FormSubmission';
import About from './components/About';
Formio.use(FormioContrib);

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FormContainer />} />
          <Route path="/builder/:id" element={<FormDesign />} />
          <Route path="/submission/:id" element={<FormSubmission />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:type" element={<About />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
