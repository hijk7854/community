import React, { Component } from 'react';
import Header from 'components/common/Header';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

class HeaderContainer extends Component {
  handleLoginClick = async () => {
    const { BaseActions, logged } = this.props;
    if(logged) {
      try {
        await BaseActions.logout();
        window.location.reload(); // 새로고침
      } catch(e) {
        console.log(e);
      }
      return;
    }
    BaseActions.showModal('login');
    BaseActions.initializeLoginModal();
  }
  handleRemove = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('remove');
  }
  render() {
    const { handleRemove, handleLoginClick } = this;
    const { match, logged, name } = this.props;
    const { id } = match.params;

    return (
      <Header
        postId={id}
        onRemove={handleRemove}
        onLoginClick={handleLoginClick}
        logged={logged}
        name={name}
      />
    )
  }
}

export default connect(
  (state) => ({
    logged: state.base.get('logged'),
    name: state.base.getIn(['loginModal', 'name'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(HeaderContainer));