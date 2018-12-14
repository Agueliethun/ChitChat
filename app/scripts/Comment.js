import React from 'react';
import Remarkable from 'remarkable';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

import '../css/base.css';

module.exports = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  commentSelected: function () {
    this.props.onCommentSelect(this.props.id);
  },
  render: function() {
    let commentFormHolder;
    if (this.props.getCurrentComment() == this.props.id) {
      commentFormHolder = <CommentForm onCommentSubmit={this.props.onCommentSubmit} />;
    } else {
      commentFormHolder = <br/>;
    }
    return (
      <div className="commentTop">
        <div className="comment" onClick={this.commentSelected}>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
        <div>
          {commentFormHolder}
        </div>
      </div>
    );
  }
});