import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from '@formio/react';
import { Button } from "react-bootstrap";

const FormSubmission = () => {
  const { id } = useParams();
  const url = `https://libresolve.linkpc.net/api/res/_builder_${id}`;
  const dataUrl = `https://libresolve.linkpc.net/api/res/_submission_${id}`;
  const [ components, setComponents ] = useState({});
  const [ submission, setSubmission ] = useState({});

  useEffect(() => {
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
      setComponents(() => data);
    })
    .catch(err => {
      setComponents(prev => prev);
    });
  }, [url]);

  useEffect(() => {
    fetch(dataUrl)
    .then(resp => resp.json())
    .then(data => {
      setSubmission(() => data);
    })
    .catch(err => {
      setSubmission(prev => prev);
    });
  }, [components, dataUrl]);

  const handleSave = (data: any) => {
    fetch(dataUrl, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => console.log(data));
  }

  return (
    <div className='App'>
      <h2>
        ID: {id}
        <Button onClick={() => handleSave(submission)}>Save form submission</Button>
      </h2>
      <Form
        form={components} 
        submission={submission} 
        onChange={(arg: any) => setSubmission({data: arg.data})}
      />
    </div>
  )
};
export default FormSubmission;