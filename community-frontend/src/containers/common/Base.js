import React, { Component } from 'react';
import LoginModalContainer from 'containers/modal/LoginModalContainer';
import MemberModalContainer from 'containers/modal/MemberModalContainer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

import { inform } from 'lib/shouldCancel';

class Base extends Component {
  initialize = async () => {
    const { BaseActions } = this.props;
    if(localStorage.logged === "true") {
      BaseActions.tempLogin();
    }
    BaseActions.checkLogin();
  }
  componentDidMount() {
    this.initialize();
    inform();
  }
  render() {
    return (
      <div>
        <LoginModalContainer/>
        <MemberModalContainer/>
      </div>
    )
  }
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(Base);