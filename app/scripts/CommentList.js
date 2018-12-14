import React from 'react';


import Comment from './Comment';
import '../css/base.css';

module.exports =  React.createClass({
  render: function() {
    var list = this;
    // console.log(this.props.data);
    var commentNodes = this.props.data.map(function(comment) {
      if (comment.parent != null) {
        this.props.data.map(function(innerComment) {
          if (innerComment.id == comment.parent) {
            comment.data[comment.data.length] = innerComment;
          }
        });
      }
      return (
        <Comment id={comment.id} onCommentSelect={list.props.onCommentSelect} onCommentSubmit={list.props.onCommentSubmit} getCurrentComment={list.props.getCurrentComment}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});