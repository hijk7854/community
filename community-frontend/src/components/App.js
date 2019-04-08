import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ListPage, PostPage, InputPage, NotFoundPage } from 'pages';
import Base from 'containers/common/Base';

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={ListPage}/>
        <Route path="/page/:page" component={ListPage}/>
        <Route path="/tag/:tag/:page?" component={ListPage}/>
        <Route path="/post/:id" component={PostPage}/>
        <Route path="/input" component={InputPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
      <Base/>
    </>
  );
};

export default App;