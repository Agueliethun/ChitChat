import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

import {API_URL, POLL_INTERVAL} from './global';

import TopicHeader from './TopicHeader';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import '../css/base.css';

module.exports = React.createClass({
  loadCommentsFromServer: function() {
    if (this.state._isMounted) {
      let url = API_URL + '/' + this.state.topic;
      console.log(url);
      $.ajax({
        url: url,
        dataType: 'json',
        cache: false,
      })
      .done(function (result) {
        console.log(result);
        this.setState({data: result});
      }.bind(this))
      .fail(function (xhr, status, errorThrown) {
        console.error(API_URL, status, errorThrown.toString());
      }.bind(this));
    }
  },
  handleTopicSubmit: function(newTopic) {
    console.log(newTopic);
    $.ajax({
      url: API_URL,
      dataType: 'json',
      type: 'POST',
      data: newTopic,
      success: function(data) {
        console.log(data);
        //TODO: redirect to new topic
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({topic: ''});
        console.error(API_URL, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {

    var comments = this.state.data;
    let topic = this.state.topic;

    if (topic === '') {
      return;
    }

    comment.topic = topic;
    let parentId = this.state.replyComment;
    if (parentId === '') {
      parentId = null;
    }
    comment.parent = parentId;

    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    let url = API_URL + '/' + topic;
    let newCommentId = -1;
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        console.log(data);
        newCommentId = data.id;
        // this.setState({data: data});
        this.loadCommentsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(API_URL, status, err.toString());
      }.bind(this)
    });

  },
  updateTopic: function(topic) {
    // console.log(topic);
    this.setState({topic: topic.id, replyComment : ''});
    setTimeout(function() {
      this.loadCommentsFromServer();
    }.bind(this), 5);
    
  },
  getInitialState: function() {
    return {data: [], _isMounted : false, topic : '', replyComment : ''};
  },
  componentDidMount: function() {
    this.state._isMounted = true;
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, POLL_INTERVAL);
  },
  componentWillUnmount: function() {
    // Reset the isMounted flag so that the loadCommentsFromServer callback
    // stops requesting state updates when the commentList has been unmounted.
    // This switch is optional, but it gets rid of the warning triggered by
    // setting state on an unmounted component.
    // See https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
    this.state._isMounted = false;
  },
  handleCommentSelect: function(id) {
    this.setState({replyComment : id});
  },
  getCurrentComment: function() {
    return this.state.replyComment;
  },
  render: function() {
    let commentFormHolder;
    if (this.state.replyComment === '') {
      commentFormHolder = <CommentForm onCommentSubmit={this.handleCommentSubmit} />;
    } else {
      commentFormHolder = <br/>;
    }

    return (
      <div className="mainPage">
        <h1>ChitChat</h1>
        <div className="navBar">
          <button className="navButton"><Link to='/'>Home</Link></button>
          <button className="navButton"><Link to='/api/about/'>About</Link></button>
        </div>
        <TopicHeader onTopicSubmit={this.handleTopicSubmit} onTopicChange={this.updateTopic} />
        <CommentList data={this.state.data} onCommentSelect={this.handleCommentSelect} onCommentSubmit={this.handleCommentSubmit} getCurrentComment={this.getCurrentComment}/>
        {commentFormHolder}
      </div>
    );
  }
});