import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './formio-style.scss';
import { FormBuilder, Formio } from '@formio/react';
import { Grid, Column, Button } from '@carbon/react';
import carbonTextInput from '../components/TextInput/TextInput';

Formio.use({
  components: {
    carbonTextInput: carbonTextInput,
  },
});

const options = {
  builder: {
    carbon: {
      title: 'Carbon',
      weight: 0,
      default: true,
    },
    basic: {
      title: 'Basic',
      weight: 10,
      default: false,
    },
    advanced: {
      title: 'Advanced',
      weight: 20,
    },
    layout: {
      title: 'Layout',
      weight: 30,
    },
    data: {
      title: 'Data',
      weight: 40,
    },
    premium: {
      title: 'Premium',
      weight: 50,
    },
  },
};

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
    <div>
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
          <h2>ID: {id}</h2>
          <FormBuilder
            form={components}
            options={options}
            onChange={props => setComponents(props)}
          />
        </Column>
      </Grid>
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
          <Button onClick={() => handleSave(components)}>
            Save Form Design
          </Button>
        </Column>
      </Grid>
    </div>
  );
};
export default FormDesign;
