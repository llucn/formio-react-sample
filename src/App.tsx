import React from 'react';
import logo from './logo.svg';
import { Form, FormBuilder } from '@formio/react';
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
    <div className='App'>
      <h2>{form.title}</h2>
      <FormBuilder
        form={form}
        onChange={(props: any) => console.log(props)}
      />
      <Form
        // src={'https://example.form.io/example'}
        form={form} 
        submission={{data: data}} 
        onSubmit={(submission: any) => onSubmitHandler(submission)} 
      />
    </div>
  );
}

export default App;
