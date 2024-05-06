import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form } from '@formio/react';
import { Formio } from '@formio/js';
import uswds from '@formio/uswds';
import '../index.css';
import '../App.css';

const FormSubmission = () => {
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

  const { id } = useParams();

  Formio.use(uswds);
  
  return (
      <div className='App'>
        <h2>ID: {id}</h2>      
        <Form
          form={form} 
          submission={{data: data}} 
          onSubmit={(submission: any) => onSubmitHandler(submission)} 
        />
    </div>
)
};
export default FormSubmission;