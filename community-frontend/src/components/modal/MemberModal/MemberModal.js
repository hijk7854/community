import React from 'react';
import styles from './MemberModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const MemberModal = ({
  visible, onJoin, onCancel, onChangeInput, id, pwd, name
}) => (
  <ModalWrapper visible={visible}>
    <div className={cx('member-modal')}>
      <div className={cx('title')}>회원 가입</div>
      <div className={cx('description')}>회원 가입 후 다양한 기능을 사용해세요.</div>
    </div>
    <div className={cx('content')}>
      <div className={cx('wrapper')}><input className={cx('input')} name="id" value={id} onChange={onChangeInput} placeholder='ID' autoFocus/></div>
      <div className={cx('wrapper')}><input className={cx('input')} name="pwd" value={pwd} onChange={onChangeInput} placeholder='PWD'/></div>
      <div className={cx('wrapper')}><input className={cx('input')} name="name" value={name} onChange={onChangeInput} placeholder='NAME'/></div>
    </div>
    <div className={cx('options')}>
      <Button onClick={onJoin}>가입</Button>
      <Button theme="gray" onClick={onCancel}>취소</Button>
    </div>
  </ModalWrapper>
);

export default MemberModal;
