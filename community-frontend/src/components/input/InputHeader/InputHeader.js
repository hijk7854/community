import React from 'react';
import styles from './InputHeader.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';
const cx = classNames.bind(styles);

const InputHeader = ({onGoBack, onSubmit, isEdit}) => {
  return (
    <div className={cx('input-header')}>
      <div className={cx('back')}>
        <Button onClick={onGoBack} theme="outline">뒤로가기</Button>
      </div>
      <div className={cx('submit')}>
        <Button onClick={onSubmit} theme="outline">{isEdit ? '수정' : '작성'}하기</Button>
      </div>
    </div>
  )
}

export default InputHeader;