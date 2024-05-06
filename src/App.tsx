import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import FormContainer from './components/FormContainer';
import FormDesign from './components/FormDesign';
import FormSubmission from './components/FormSubmission';
import About from './components/About';
import './index.css';
import './App.css';

function App() {

  const form = {
    title: 'Example Form',
    display: 'form',
    components: [
      {
        label: 'Name',
        key: 'name',
        type: 'textfield',
      },
      {
        label: 'Email',
        key: 'email',
        type: 'email',
      },
      {
        label: 'Save',
        key: 'save',
        type: 'button',
        action: 'submit',
      },
    ],
  };

  const data = {
    name: 'Lane',
    email: 'lane.cn@gmail.com',
  }

  const onSubmitHandler = (submission: any) => {
    console.table(submission.data);
  }

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
