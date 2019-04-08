import React from 'react';
import styles from './PostBody.scss';
import classNames from 'classnames/bind';
// import MarkdownRender from 'components/comomon/MarkdownRender';

const cx = classNames.bind(styles);

const PostBody = ({content}) => (
  <div className={cx('post-body')}>
    <div className={cx('paper')}>
      <div>
        {content}
      </div>
    </div>
  </div>
);

export default PostBody;