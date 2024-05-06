import React, { useState, useEffect } from "react";
import Header from "./Header";
import FormList from "./FormList";
import InputForm from "./InputForm";
import Form from "./Form";

const FormContainer = () => {
  const url = "https://libresolve.linkpc.net/api/res/_form_list";
  const [forms, setForms] = useState<Form[]>([]);

  const handleAdd = (name: string) => {
    // console.log(`handleAdd: ${name}`);
    const rand = Math.floor(Math.random() * 9000) + 1000;
    const form = {
      id: `${new Date().getTime()}-${rand}`,
      name: name,
    };
    // console.log('Add new form: ', form);
    setForms((prev) => {
      const fs = [...prev, form];
      updateData(fs);
      return fs;
    });
  };

  const handleDelete = (id: string) => {
    // console.log(`handleDelete: ${id}`);
    setForms(prev => {
      const fs = prev.filter(f => f.id !== id);
      updateData(fs);
      return fs;
    });
  };

  const handleChange = (form: Form) => {
    const { id, name } = form;
    // console.log(`handleChange, id: ${id}, name: ${name}`);
    setForms(prev => {
      const fs = prev.map(f => f.id === id ? {...f, name: name} : f);
      return fs;
    });
  };

  const handleUpdate = (form: Form) => {
    const { id, name } = form;
    // console.log(`handleUpdate, id: ${id}, name: ${name}`);
    setForms(prev => {
      const fs = prev.map(f => f.id === id ? {...f, name: name} : f);
      updateData(fs);
      return fs;
    });
  };

  const updateData = async (forms: Form[]) => {
    console.log('updateData', {forms: forms});
    fetch(url, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({forms: forms})
    })
    .then(resp => resp.json())
    .then(data => console.log(data));
  }

  useEffect(() => {
    fetch(url)
    .then(resp => {
      return resp.json();
    })
    .then(data => {
      // console.log("Get data", data);
      setForms(() => [...data.forms]);
    })
    .catch(err => {
      setForms(prev => [...prev]);
    });
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputForm handleAddProp={handleAdd} />
        <FormList
          forms={forms}
          handleDeleteProp={handleDelete}
          handleChangeProp={handleChange}
          handleUpdateProp={handleUpdate}
        />
      </div>
    </div>
  );
};
export default FormContainer;
