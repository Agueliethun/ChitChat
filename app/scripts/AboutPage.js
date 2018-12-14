import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

// import '../css/base.css';

module.exports = React.createClass({
	render: function() {
	    return (
	      <div className="about">
		    <h1>ChitChat</h1>
		    <div className="navBar">
	          <button className="navButton"><Link to='/'>Home</Link></button>
	          <button className="navButton"><Link to='/api/about/'>About</Link></button>
	        </div>
			<h2>This application was created by Royce Lloyd and Matthew Nykamp</h2>
			<h2>When asked about why they made this app, they responded with very easy to format HTML answers</h2>
			<p>Royce: "We wanted to create something that allowed uses to discuss the issues that matter to them, without fear of judjment"</p>
			<p>Matthew: "The biggest strengths of this app are:"</p>
			<ul>
					<li>The ability to create conversation about that things that matter to you.</li>
					<li>It's responsive and robust design.</li>
					<li>I can finally talk about dilbert with all my friends!</li>
			</ul>
		</div>
	    );
	  }
});
