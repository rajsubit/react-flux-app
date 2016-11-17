"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorApi = require('../../api/authorApi');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component){
			if (component.state.dirty && !confirm("Leave without saving?")){
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			author: {'id': '', firstName: '', lastName: ''},
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function() {
		var authorId = this.props.params.id; // from the path '/author:id'	
		if (authorId) {
			this.setState({author: AuthorApi.getAuthorById(authorId)});
		}
	},

	setAuthorState: function(event){
		this.setState({dirty: true});
		var field = event.target.name;
		var value = event.target.value;
		this.state.author[field] = value;
		return this.setState({author: this.state.author});
	},

	authorFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {}; // clear any previous errors
		
		if (this.state.author.firstName.length < 3){
			this.state.errors.firstName = "First Name must be atleast 3 characters";
			formIsValid = false;
		}
		if (this.state.author.lastName.length < 3){
			this.state.errors.lastName = "Last Name must be atleast 3 characters";
			formIsValid = false;
		}
		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveAuthor: function(event){
		event.preventDefault();
		if (!this.authorFormIsValid()){
			return;
		}

		AuthorApi.saveAuthor(this.state.author);
		this.setState({dirty: false});
		toastr.success('Author is Saved.');
		this.transitionTo('authors');
	},

	render: function() {
		return (
			<AuthorForm author={this.state.author}
			onChange={this.setAuthorState}
			onSave={this.saveAuthor}
			errors={this.state.errors} />
		);
	}
});

module.exports = ManageAuthorPage;
