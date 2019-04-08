import React, { Component } from 'react';
import styles from './InputTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class InputTemplate extends Component {
  render() {
    const { header, input } = this.props;
    return (
      <div className={cx('input-template')}>
        {header}
        <div className={cx('panes')}>
          <div className={cx('pane', 'input')}>
            {input}
          </div>
        </div>
      </div>
    )
  }
}

export default InputTemplate;