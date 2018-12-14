import React from 'react';
import $ from 'jquery';

import {API_URL, POLL_INTERVAL} from './global';

import '../css/base.css';

module.exports = React.createClass({
	render: function (){
		<div className="about">
			<h1>This application was created by Royce Lloyd and Matthew Nykamp</h1>
			<h2>When asked about why they made this app, they responded with very easy to format HTML answers</h2>
			<p>Royce: "We wanted to create something that allowed uses to discuss the issues that matter to them, without fear of judjment"</p>
			<p>Matthew: "The biggest strength of this app are:"</p>
			<ul>
  				<li>The ability to create conversation about that things that matter to you.</li>
  				<li>It's responsive and robust design</li>
  				<li>I can finally talk about dilbert with all my friends!</li>
			</ul>
	}
})
