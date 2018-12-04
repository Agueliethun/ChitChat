import React from 'react';

import Comment from './Comment';
import '../css/base.css';

module.exports =  React.createClass({
  render: function() {
    console.log(this.props.data);
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment>
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