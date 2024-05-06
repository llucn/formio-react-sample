import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./FormItem.module.css";
import { FaTrash, FaDatabase, FaCode } from "react-icons/fa";
import Form from "./Form";

const FormItem = (props: {
  form: Form;
  handleChangeProp: (form: Form) => void;
  handleUpdateProp: (form: Form) => void;
  handleDeleteProp: (id: string) => void;
}) => {
  const [editing, setEditing] = useState(false);

  const handleEditing = (id: string) => {
    console.log(`handleEditing: ${id}`);
    setEditing(true);
  };

  const onChange = (e: any) => {
    var id = props.form.id;
    var name = e.target.value;
    // console.log(`onChange, id: ${id}, name: ${name}`);
    props.handleChangeProp({ id, name });
  };

  const handleUpdateDone = (e: any) => {
    if (e.key === "Enter") {
      console.log(`key: ${e.key}`);
      setEditing(false);
      props.handleUpdateProp({ id, name });
    }
  };

  useEffect(() => {
    return () => {
      console.log("FormItem useEffect");
    };
  }, []);

  const { id, name } = props.form;

  let viewMode: { display?: string } = {};
  let editMode: { display?: string } = {};
  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  return (
    <li className={styles.item}>
      <div onDoubleClick={() => handleEditing(id)} style={viewMode}>
        <span>{name}</span>
        <button onClick={() => props.handleDeleteProp(id)}>
          <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
        </button>
        <button>
          <NavLink to={`/submission/${id}`}>
            <FaDatabase style={{ color: "grey", fontSize: "16px" }} />
          </NavLink>
        </button>
        <button>
          <NavLink to={`/builder/${id}`}>
            <FaCode style={{ color: "grey", fontSize: "16px" }} />
          </NavLink>
        </button>
      </div>
      <input
        type="text"
        className={styles.textInput}
        style={editMode}
        value={name}
        onChange={onChange}
        onKeyDown={handleUpdateDone}
      />
    </li>
  );
};
export default FormItem;
