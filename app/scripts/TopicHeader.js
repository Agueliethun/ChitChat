import React from 'react';
import $ from 'jquery';

import {API_URL, POLL_INTERVAL} from './global';

import '../css/base.css';

module.exports =  React.createClass({
  getInitialState: function() {
    return {topic: '', topicInput: '', _isMounted : false, data : []};
  },
  loadTopicsFromServer: function() {
    if (this.state._isMounted) {
      $.ajax({
        url: API_URL,
        dataType: 'json',
        cache: false,
      })
      .done(function (result) {
        this.setState({data: result});
      }.bind(this))
      .fail(function (xhr, status, errorThrown) {
        console.error(API_URL, status, errorThrown.toString());
      }.bind(this));      
    }
  },
  handleTextChange: function(e) {
    this.setState({topicInput: e.target.value});
  },
  handleTopicChange: function(e) {
    console.log(e.target.value);
    this.setState({topic: e.target.value});
    this.props.onTopicChange({id : e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onTopicSubmit({name: this.state.topicInput});
    this.setState({topic: this.state.topicInput, topicInput: ''});
  },
  componentDidMount: function() {
    this.state._isMounted = true;
    this.loadTopicsFromServer();
    setInterval(this.loadTopicsFromServer, POLL_INTERVAL);
  },
  componentWillUnmount: function() {
    // Reset the isMounted flag so that the loadCommentsFromServer callback
    // stops requesting state updates when the commentList has been unmounted.
    // This switch is optional, but it gets rid of the warning triggered by
    // setting state on an unmounted component.
    // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
    this.state._isMounted = false;
  },
  render: function() {
    var topicNodes = this.state.data.map(function(topic) {
      return (
        <option value={topic.id}>{topic.topic} : {topic.id}</option>
      );
    });

    let select = <select id='topics' name='topics' onChange={this.handleTopicChange}>{topicNodes}</select>;
    
    return (
      <div className="topicHeader">
        <form className="topicSelect">
          {select}
        </form>
        <form className="newTopic" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Make New Topic..."
            value={this.state.topicInput}
            onChange={this.handleTextChange}
          />
          <input type="submit" value="Post"/>
        </form>
      </div>
    );
  }
});