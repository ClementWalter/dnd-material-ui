import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ListDnd from './ListDnd'
import ListItemDnd from './ListItemDnd';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Drag n drop Material-ui components</h1>
        </header>
        <ListDnd>
          <ListItemDnd primaryText="Inbox" leftIcon={<ContentInbox />} />
          <ListItemDnd primaryText="Starred" leftIcon={<ActionGrade />} />
          <ListItemDnd primaryText="Sent mail" leftIcon={<ContentSend />} />
          <ListItemDnd primaryText="Drafts" leftIcon={<ContentDrafts />} />
          <ListItemDnd primaryText="Inbox" leftIcon={<ContentInbox />} />
        </ListDnd>
      </div>
    );
  }
}

export default App;
