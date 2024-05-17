import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import FormTable from './FormTable';
import { DataTableSkeleton, Grid, Column } from '@carbon/react';
import FormItem from './FormItem';
import InputForm from './InputForm';

const headers = [
  {
    key: 'id',
    header: 'ID',
  },
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'links',
    header: 'Links',
  },
];

const LinkList = ({ id, handleDelete }) => (
  <div>
    <span>
      <NavLink to={`/form/design/${id}`}>Design</NavLink> |{' '}
    </span>
    <span>
      <NavLink to={`/form/data/${id}`}>Data</NavLink> |{' '}
    </span>
    <span>
      <NavLink to={'#'} onClick={() => handleDelete(id)}>
        Delete
      </NavLink>
    </span>
  </div>
);

const getRowItems = (rows, handleUpdate, handleChange, handleDelete) =>
  rows.map(row => ({
    ...row,
    id: row.id.toString(),
    name: (
      <FormItem
        row={row}
        handleUpdateProp={handleUpdate}
        handleChangeProp={handleChange}
      />
    ),
    links: <LinkList id={row.id} handleDelete={handleDelete} />,
  }));

const FormContainer = () => {
  const url = 'https://libresolve.linkpc.net/api/res/_form_list';
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const handleAdd = name => {
    // console.log(`handleAdd: ${name}`);
    const rand = Math.floor(Math.random() * 9000) + 1000;
    const form = {
      id: `${new Date().getTime()}-${rand}`,
      name: name,
    };
    // console.log('Add new form: ', form);
    setForms(prev => {
      const fs = [...prev, form];
      updateData(fs);
      return fs;
    });
  };

  const handleDelete = id => {
    // console.log(`handleDelete: ${id}`);
    setForms(prev => {
      const fs = prev.filter(f => f.id !== id);
      updateData(fs);
      return fs;
    });
  };

  const handleChange = form => {
    const { id, name } = form;
    // console.log(`handleChange, id: ${id}, name: ${name}`);
    setForms(prev => {
      const fs = prev.map(f => (f.id === id ? { ...f, name: name } : f));
      return fs;
    });
  };

  const handleUpdate = form => {
    const { id, name } = form;
    // console.log(`handleUpdate, id: ${id}, name: ${name}`);
    setForms(prev => {
      const fs = prev.map(f => (f.id === id ? { ...f, name: name } : f));
      updateData(fs);
      return fs;
    });
  };

  const updateData = async forms => {
    console.log('updateData', { forms: forms });
    fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forms: forms }),
    })
      .then(resp => resp.json())
      .then(data => console.log(data));
  };

  useEffect(() => {
    fetch(url)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log('Get data', data);
        setForms(() => [...data.forms]);
        setLoading(false);
      })
      .catch(err => {
        setForms(prev => [...prev]);
        setError('Error obtaining repository data');
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return (
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={5}
            headers={headers}
          />
        </Column>
      </Grid>
    );
  }

  if (error) {
    return `Error! ${error}`;
  }

  return (
    <div>
      <Grid className="repo-page">
        <Column lg={16} md={8} sm={4} className="repo-page__r1">
          <FormTable
            headers={headers}
            rows={getRowItems(forms, handleUpdate, handleChange, handleDelete)}
          />
        </Column>
      </Grid>
      <InputForm handleAddProp={handleAdd} />
    </div>
  );
};

export default FormContainer;
