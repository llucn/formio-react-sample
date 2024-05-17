import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './formio-style.scss';
import { FormBuilder } from '@formio/react';
import { Button } from '@carbon/react';

const FormDesign = () => {
  const { id } = useParams();
  const url = `https://libresolve.linkpc.net/api/res/_builder_${id}`;
  const [components, setComponents] = useState({});

  useEffect(() => {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        setComponents(() => data);
      })
      .catch(() => {
        setComponents(prev => prev);
      });
  }, [url]);

  const handleSave = props => {
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    })
      .then(resp => resp.json())
      .then(data => console.log(data));
  };

  return (
    <div className="App">
      <h2>ID: {id}</h2>
      <Button onClick={() => handleSave(components)}>Save Form Design</Button>
      <FormBuilder form={components} onChange={props => setComponents(props)} />
    </div>
  );
};
export default FormDesign;
