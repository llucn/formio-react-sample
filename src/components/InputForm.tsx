import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputForm = (props: { handleAddProp: (name: string) => void }) => {
  const [inputText, setInputText] = useState({
    name: "",
  });

  const onChange = (e: any) => {
    setInputText((preState) => {
      return {
        ...preState,
        name: e.target.value,
      };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputText.name.trim()) {
      props.handleAddProp(inputText.name);
      setInputText((preState) => {
        return {
          ...preState,
          name: "",
        };
      });
    } else {
      alert("Please input text");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        name="name"
        type="text"
        placeholder="Add form ..."
        className="input-text"
        value={inputText.name}
        onChange={onChange}
      />
      <button className="input-submit">
        <FaPlusCircle />
      </button>
    </form>
  );
};
export default InputForm;
