import React from "react";
import FormItem from "./FormItem";
import Form from "./Form";

const FormList = (props: {
  forms: Form[];
  handleChangeProp: (form: Form) => void;
  handleUpdateProp: (form: Form) => void;
  handleDeleteProp: (id: string) => void;
}) => {
  return (
    <ul>
      {props.forms.map((form) => (
        <FormItem
          key={form.id}
          form={form}
          handleChangeProp={props.handleChangeProp}
          handleUpdateProp={props.handleUpdateProp}
          handleDeleteProp={props.handleDeleteProp}
        />
      ))}
    </ul>
  );
};
export default FormList;
