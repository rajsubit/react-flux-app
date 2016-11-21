"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
// var AuthorApi = require('../../api/authorApi');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({
	getInitialState: function() {
			return {
				// authors: []
				authors: AuthorStore.getAllAuthors()
			};
	},

	componentWillMount: function() {
		AuthorStore.addChangeListener(this.onChange);		
	},

	componentWillUnmount: function() {
		AuthorStore.removeChangeListener(this.onChange);		
	},	

	onChange: function() {
		this.setState({authors: AuthorStore.getAllAuthors()});
	},

	// componentDidMount: function() {
	// 	if (this.isMounted()){
	// 		// this.setState({ authors: AuthorApi.getAllAuthors() });
	// 		this.setState({ authors: AuthorStore.getAllAuthors() });
	// 	}
	// },

	render: function() {
		return (
			<div>
				<h1>Authors</h1>
				<Link to="addAuthor" className="btn btn-default">Add Author</Link>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = AuthorPage;
