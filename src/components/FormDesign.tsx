import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormBuilder } from '@formio/react';
import { Button } from "react-bootstrap";

const FormDesign = () => {
  const { id } = useParams();
  const url = `https://libresolve.linkpc.net/api/res/_builder_${id}`;
  const [ components, setComponents ] = useState({});

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

  const handleSave = (props: any) => {
    fetch(url, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(props)
    })
    .then(resp => resp.json())
    .then(data => console.log(data));
  }

  return (
    <div className='App'>
      <h2>
        ID: {id}
        <Button onClick={() => handleSave(components)}>Save form design</Button>
      </h2>
      <FormBuilder
        form={components}
        onChange={(props: any) => setComponents(props)}
      />
    </div>
  )
};
export default FormDesign;