import React, { Component } from 'react';
import './app.scss';
import { Content, Theme } from '@carbon/react';
import TutorialHeader from './components/TutorialHeader';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import RepoPage from './content/RepoPage';
import FormContainer from './components/FormContainer';
import FormDesign from './content/FormDesign';
import FormData from './content/FormData';
import CarbonSample from './content/CarbonSample';

class App extends Component {
  render() {
    return (
      <Router>
        <Theme theme="g100">
          <TutorialHeader />
        </Theme>
        <Content>
          <Switch>
            <Route exact path="/" component={FormContainer} />
            <Route path="/repos" component={RepoPage} />
            <Route path="/form/design/:id" component={FormDesign} />
            <Route path="/form/data/:id" component={FormData} />
            <Route path="/carbon" component={CarbonSample} />
          </Switch>
        </Content>
      </Router>
    );
  }
}

export default App;
