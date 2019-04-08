import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);

const PostItem = ({title, publishedDate, tags, id, views, name}) => {
  const tagList = tags.map(
    tag => <Link key={tag} to={`/tag/${tag}`}>#{tag}</Link>
  );
  return (
    <div className={cx('post-item')}>
      <h2><Link to={`/post/${id}`}>{title}</Link></h2>
      <div className={cx('body')}>
        <div className={cx('views')}><i className="fa fa-eye" aria-hidden="true"></i><p>{views}</p></div>
        <div className={cx('user-name')}><p>{name}</p></div>
        <div className={cx('tags')}>
          {tagList}
        </div>
        <div className={cx('date')}>{moment(publishedDate).format('LLL')}</div>
      </div>
    </div>
  )
};

const PostList = ({posts}) => {
  const postList = posts.map(
    (post) => {
      const { _id, title, publishedDate, tags, views, name } = post.toJS();
      return (
        <PostItem
          views={views}
          title={title}
          publishedDate={publishedDate}
          tags={tags}
          key={_id}
          id={_id}
          name={name}
        />
      )
    }
  );
  return (
    <div className={cx('post-list')}>
      {postList}
    </div>
  )
};

export default PostList;