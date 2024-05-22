import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent } from '@formio/react';
import settingsForm from './TextInput.settingsForm';
import { TextInput, TextInputSkeleton } from '@carbon/react';

const CarbonTextInputComp = ({ component, onChange, setCallback }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    value: '',
  });

  const setValue = text => {
    setState(() => ({ value: text }), onChange(text));
  };

  const callback = (dataValue, data) => {
    setState(() => ({ value: dataValue || '' }), setLoading(false));
  };

  useEffect(() => {
    setCallback(callback);
  }, [setCallback]);

  if (loading) {
    return <TextInputSkeleton hideLabel={true} />;
  }

  return (
    <TextInput
      id={`carbon_component_${component.key}`}
      type="text"
      labelText={''}
      placeholder={component.placeholder}
      value={state.value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default class CarbonTextInput extends ReactComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.data = data;
    this.callback = null;
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
        onChange={this.updateValue}
        setCallback={this.setCallback}
      />,
      element
    );
  }

  detachReact(element) {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  }

  setCallback = callback => {
    this.callback = callback;
  };

  setValue(value) {
    super.setValue(value);
    setTimeout(() => {
      if (this.callback) {
        this.callback(this.dataValue, this.data);
      }
    }, 0);
  }
}
