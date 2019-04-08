import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Header = ({postId, onRemove, onLoginClick, logged, name}) => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
        <Link to="/">community</Link>
      </div>
      <div className={cx('right')}>
        {
          !postId && [
            <Button key="login" theme="outline" onClick={onLoginClick}>{logged ? '로그아웃' : '로그인'}</Button>
          ]
        }
        { logged && 
          <div className={cx('logged-btn')}>
            {
              postId && [
                <Button key="edit" theme="outline" to={`/input?id=${postId}`}>수정</Button>,
                <Button key="remove" theme="outline" onClick={onRemove}>삭제</Button>,
              ]
            }
            <Button theme="outline" to="/input">새 포스트</Button>
          </div>
        }
      </div>
    </div>
  </header>
);

export default Header;