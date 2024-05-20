import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './formio-style.scss';
import { Form, Formio } from '@formio/react';
import { Grid, Column, Button } from '@carbon/react';
import carbonTextInput from '../components/TextInput/TextInput';

Formio.use({
  components: {
    carbonTextInput: carbonTextInput,
  },
});

const FormData = () => {
  const { id } = useParams();
  const url = `https://libresolve.linkpc.net/api/res/_builder_${id}`;
  const dataUrl = `https://libresolve.linkpc.net/api/res/_submission_${id}`;
  const [components, setComponents] = useState({});
  const [submission, setSubmission] = useState({});

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
      .catch(() => {
        setSubmission(prev => prev);
      });
  }, [components, dataUrl]);

  const handleSave = data => {
    fetch(dataUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(resp => resp.json())
      .then(data => console.log(data));
  };

  return (
    <div>
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
          <h2>ID: {id}</h2>
          <Form
            form={components}
            submission={submission}
            onChange={arg => setSubmission({ data: arg.data })}
          />
        </Column>
      </Grid>
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
          <Button onClick={() => handleSave(submission)}>Save Form Data</Button>
        </Column>
      </Grid>
    </div>
  );
};
export default FormData;
