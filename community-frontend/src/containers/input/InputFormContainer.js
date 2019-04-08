import React, { Component } from 'react';
import InputForm from 'components/input/InputForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as inputActions from 'store/modules/input';

class InputFormContainer extends Component {

  handleChangeInput = ({name, value}) => {
    const { InputActions } = this.props;
    InputActions.changeInput({name, value});
  }

  render() {
    const { title, tags, content } = this.props;
    const { handleChangeInput } = this;

    return (
      <InputForm
        title={title}
        tags={tags}
        content={content}
        onChangeInput={handleChangeInput}
      />
    );
  }
}

export default connect(
  (state) => ({
    title: state.input.get('title'),
    tags: state.input.get('tags'),
    content: state.input.get('content'),
  }),
  (dispatch) => ({
    InputActions: bindActionCreators(inputActions, dispatch)
  })
)(InputFormContainer)