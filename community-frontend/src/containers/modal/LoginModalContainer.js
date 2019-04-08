import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import LoginModal from 'components/modal/LoginModal';
import { withRouter } from 'react-router-dom';

class LoginModalContainer extends Component {
  
  handleLogin = async () => {
    const { BaseActions, id, pwd } = this.props;
    try { 
      // 로그인 시도, 성공하면 모달 닫기
      await BaseActions.login({id, pwd});
      BaseActions.hideModal('login');
      localStorage.logged = "true";
    } catch(e) {
      console.log(e);
    }
  }
  handleCancle = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('login');
  }
  handleChange = (e) => {
    const { value, name } = e.target;
    const { BaseActions } = this.props;
    BaseActions.changeInput({value, name});
  }
  handleKeyPress = (e) => {
    // 엔터 키를 누르면 로그인 호출
    if(e.key === 'Enter') {
      this.handleLogin();
    }
  }
  // 회원 가입창 이동
  handleMember = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('login');
    BaseActions.showModal('member');
  }

  render() {
    const { visible, error, id, pwd } = this.props;
    const { 
      handleLogin, handleCancle, handleChange, handleKeyPress, handleMember 
    } = this;

    return (
      <LoginModal 
        visible={visible}
        onLogin={handleLogin}
        onCancel={handleCancle}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        onMember={handleMember}
        error={error}
        id={id}
        pwd={pwd}
      />
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'login']),
    id: state.base.getIn(['loginModal', 'id']),
    pwd: state.base.getIn(['loginModal', 'pwd']),
    error: state.base.getIn(['loginModal', 'error'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(LoginModalContainer));