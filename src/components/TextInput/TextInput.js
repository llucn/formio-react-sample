import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ReactComponent } from '@formio/react';
import settingsForm from './TextInput.settingsForm';
import { TextInput } from '@carbon/react';

export default class CarbonTextInput extends ReactComponent {
  static get builderInfo() {
    return {
      title: 'Carbon Text Input',
      icon: 'terminal',
      group: 'basic',
      documentation: '',
      weight: -10,
      schema: CarbonTextInput.schema(),
    };
  }

  static schema() {
    return ReactComponent.schema({
      type: 'carbonTextInput',
      label: 'Default Label',
    });
  }

  static editForm = settingsForm;

  attachReact(element) {
    return ReactDOM.render(<TextInput />, element);
  }

  detachReact(element) {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  }
}
