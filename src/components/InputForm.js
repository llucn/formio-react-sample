import React, { useState } from 'react';
import { Grid, Column } from '@carbon/react';
import { TextInput, Button } from '@carbon/react';
import { Add } from '@carbon/icons-react';

const InputForm = ({ handleAddProp }) => {
  const [inputText, setInputText] = useState({
    name: '',
  });

  const onChange = e => {
    setInputText(preState => {
      return {
        ...preState,
        name: e.target.value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    add(inputText.name);
  };

  const add = name => {
    if (name.trim()) {
      handleAddProp(name);
      setInputText(preValue => {
        return {
          ...preValue,
          name: '',
        };
      });
    } else {
      alert('Please input text');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Grid className="repo-page">
        <Column lg={8} md={4} sm={2} className="repo-page__r1">
          <TextInput
            id={'textInputName'}
            labelText={''}
            value={inputText.name}
            placeholder="Add form ..."
            onChange={onChange}
          />
        </Column>
        <Column lg={4} md={2} sm={1} className="repo-page__r1">
          <Button onClick={() => add(inputText.name)}>
            Add <Add />
          </Button>
        </Column>
      </Grid>
    </form>
  );
};

export default InputForm;
