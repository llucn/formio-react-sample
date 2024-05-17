import React, { useState, useEffect } from 'react';
import styles from './FormItem.module.css';
import { TextInput } from '@carbon/react';

const FormItem = ({ row, handleUpdateProp, handleChangeProp }) => {
  const [editing, setEditing] = useState(false);

  const handleEditing = id => {
    console.log(`handleEditing: ${id}`);
    setEditing(true);
  };

  const onChange = e => {
    var id = row.id;
    var name = e.target.value;
    console.log(`onChange, id: ${id}, name: ${name}`);
    handleChangeProp({ id, name });
  };

  const handleUpdateDone = e => {
    if (e.key === 'Enter') {
      console.log(`key: ${e.key}`);
      setEditing(false);
      handleUpdateProp({ id, name });
    }
  };

  const { id, name } = row;

  if (editing) {
    return (
      <TextInput
        className={styles.textInput}
        value={name}
        onChange={onChange}
        onKeyDown={handleUpdateDone}
      />
    );
  }

  return (
    <div onDoubleClick={() => handleEditing(id)}>
      <span>{name}</span>
    </div>
  );
};

export default FormItem;
