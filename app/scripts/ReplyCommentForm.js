import React from 'react';

import '../css/base.css';


module.exports =  React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onCommentSubmit({text: text});
    this.setState({text: ''});
  },
  render: function() {
    return (
      <form className="replyCommentForm" onSubmit={this.handleSubmit}>
        <textarea 
        	name="input" 
        	rows="10" 
        	cols="30"
        	placeholder= "Add your thoughts..."
        	value={this.state.text}
        	onChange={this.handleTextChange}></textarea>
        	
        <input type="submit" value="Post" />
      </form>
    );
  }
});