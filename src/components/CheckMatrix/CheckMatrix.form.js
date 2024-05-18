import { Components } from '@formio/react';
import CheckMatrixEditDisplay from './editForm/CheckMatrix.edit.display';
const nestedComponentForm = Components.components.nested.editForm;
export default function(...extend) {
  return nestedComponentForm(
    [
      {
        key: 'display',
        components: CheckMatrixEditDisplay,
      },
    ],
    ...extend
  );
}
