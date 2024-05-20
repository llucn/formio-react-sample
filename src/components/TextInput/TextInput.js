import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent } from '@formio/react';
import settingsForm from './TextInput.settingsForm';
import { TextInput, TextInputSkeleton } from '@carbon/react';

const CarbonTextInputComp = ({ component, value, onChange }) => {
  const [state, setState] = useState({
    value: value,
  });

  const setValue = text => {
    setState(() => ({ value: text }), onChange(text));
  };

  if (state.value || true) {
    return (
      <TextInput
        id={`carbon_component_${component.key}`}
        type="text"
        // labelText={component.label}
        // helperText={component.description}
        placeholder={component.placeholder}
        value={state.value}
        onChange={e => setValue(e.target.value)}
      />
    );
  }

  return <TextInputSkeleton />;
};

export default class CarbonTextInput extends ReactComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  init() {
    super.init();
    console.log('init: ', this.getValue());
  }

  static get builderInfo() {
    return {
      title: 'Text Input',
      icon: 'terminal',
      group: 'carbon',
      documentation: '',
      weight: 0,
      schema: CarbonTextInput.schema(),
    };
  }

  static schema() {
    return ReactComponent.schema({
      type: 'carbonTextInput',
      label: 'textInput',
    });
  }

  static editForm = settingsForm;

  attachReact(element) {
    // console.log('CarbonTextInput component:', this.component, 'dataValue:', this.dataValue, 'updateValue:', this.updateValue, 'setValue', this.setValue);
    return ReactDOM.render(
      <CarbonTextInputComp
        component={this.component}
        value={this.dataValue}
        onChange={this.updateValue}
      />,
      element
    );
  }

  detachReact(element) {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  }
}
