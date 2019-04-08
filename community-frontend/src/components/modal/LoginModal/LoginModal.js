import React from 'react';
import styles from './LoginModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const LoginModal = ({
    visible, id, pwd, error, onLogin, onCancel, onChange, onKeyPress ,onMember
  }) => (
  <ModalWrapper visible={visible}>
    <div className={cx('login-modal')}>
      <div className={cx('title')}>로그인</div>
      <div className={cx('description')}>로그인 후 다양한 기능을 사용해세요.</div>
    </div>
    <div className={cx('content')}>
      <div className={cx('wrapper')}><input className={cx('input')} name="id" value={id} onChange={onChange} placeholder='ID' autoFocus/></div>
      <div className={cx('wrapper')}><input className={cx('input')} name="pwd" value={pwd} onChange={onChange} placeholder='PWD' onKeyPress={onKeyPress}/></div>
    </div>
    { error && <div className={cx('error')}>로그인 실패</div> }
    <div className={cx('options')}>
      <Button onClick={onLogin}>로그인</Button>
      <Button onClick={onMember}>회원가입</Button>
      <Button theme="gray" onClick={onCancel}>취소</Button>
    </div>
  </ModalWrapper>
);

export default LoginModal;