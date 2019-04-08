import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as joinActions from 'store/modules/join'; // 고
import MemberModal from 'components/modal/MemberModal';
import { withRouter } from 'react-router-dom';

class MemberModalContainer extends Component {

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('member');
  }

  handleJoin = async () => {
    const { id, pwd, name, JoinActions, history } = this.props;
    const member = {
      id: id.trim(),
      pwd: pwd.trim(),
      name: name.trim()  
    };
    try {  
      await JoinActions.joinMember(member);
      this.handleCancel();
      history.push('/');
    } catch(e) {
      console.log(e);
    }
  }

  handleChangeInput = (e) => {
    const { value, name } = e.target;
    const { JoinActions } = this.props;
    JoinActions.changeInput({value, name});
  }

  render() {
    const { visible } = this.props;
    const { handleCancel, handleJoin, handleChangeInput } = this;

    return (
      <MemberModal
        visible={visible}
        onCancel={handleCancel}
        onJoin={handleJoin}
        onChangeInput={handleChangeInput}
      />
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'member']),
    id: state.join.get('id'),
    pwd: state.join.get('pwd'),
    name: state.join.get('name'),
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    JoinActions: bindActionCreators(joinActions, dispatch) // 고민
  })
)(withRouter(MemberModalContainer));