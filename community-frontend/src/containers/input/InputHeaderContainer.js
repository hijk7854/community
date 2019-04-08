import React, { Component } from 'react';
import InputHeader from 'components/input/InputHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import * as inputActions from 'store/modules/input';

import queryString from 'query-string';

class InputHeaderContainer extends Component {

  componentDidMount() {
    const { InputActions, location } = this.props;
    InputActions.initialize();
    // 쿼리 파싱
    const { id } = queryString.parse(location.search);
    if(id) {
      InputActions.getPost(id);
    }
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  handleSubmit = async () => {
    const { title, content, tags, name, InputActions, history, location } = this.props;
    const post = {
      title,
      content,
      name,
      // 태그 문자열을 ,로 분리 및 앞뒤 공백 삭제
      tags: tags === "" ? [] : [...new Set(tags.split(',').map(tag => tag.trim()))]
    };
    try {
      // id가 존재한다면 editPost 호출
      const { id } = queryString.parse(location.search);
      if(id){
        await InputActions.editPost({id, ...post});
        history.push(`/post/${id}`);
        return;
      }      
      await InputActions.writePost(post);
      // 페이지를 이동시킵니다. 주의: postId는 위쪽에서 레퍼런스를 만들지 않고
      // 이 자리에서 this.props.postId를 조회해야 한다(현재 값을 불러오기 위함)
      history.push(`/post/${this.props.postId}`);
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { handleGoBack, handleSubmit } = this;
    const { id } = queryString.parse(this.props.location.search);
    return (
      <InputHeader
        onGoBack={handleGoBack}
        onSubmit={handleSubmit}
        isEdit={id ? true : false}
      />
    );
  }
}

export default connect(
  (state) => ({
    title: state.input.get('title'),
    content: state.input.get('content'),
    tags: state.input.get('tags'),
    postId: state.input.get('postId'),
    name: state.base.getIn(['loginModal', 'name'])
  }),
  (dispatch) => ({
    InputActions: bindActionCreators(inputActions, dispatch)
  })
)(withRouter(InputHeaderContainer))