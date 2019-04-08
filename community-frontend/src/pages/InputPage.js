import React from 'react';
import InputTemplate from 'components/input/InputTemplate';
import InputHeaderContainer from 'containers/input/InputHeaderContainer';
import InputFormContainer from 'containers/input/InputFormContainer';

const InputPage = () => {
  return (
    <InputTemplate
      header={<InputHeaderContainer/>}
      input={<InputFormContainer/>}
    />
  );
};

export default InputPage;