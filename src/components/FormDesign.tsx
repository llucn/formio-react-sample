import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FormBuilder } from '@formio/react';
import { Formio } from '@formio/js';
import uswds from '@formio/uswds';
import '../index.css';
import '../App.css';

const FormDesign = () => {
  const { id } = useParams();

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

  Formio.use(uswds);

  return (
    <div className='App'>
      <h2>ID: {id}</h2>
      <FormBuilder
        form={form}
        onChange={(props: any) => console.log(props)}
      />
    </div>
  )
};
export default FormDesign;