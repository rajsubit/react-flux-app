"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';
var authorList = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllAuthors: function() {
		return authorList;
	},

	getAuthorById: function(id) {
		return _.find(authorList, {id: id});
	}
});

Dispatcher.register(function(action){
	switch(action.actionType){
		case ActionTypes.INITIALIZE:
			authorList = action.initialData.authors;
			AuthorStore.emitChange();
			break;
		case ActionTypes.CREATE_AUTHOR:
			authorList.push(action.author);
			AuthorStore.emitChange();
			break;
		case ActionTypes.UPDATE_AUTHOR:
			var existingAuthor = _.find(authorList, {id: action.author.id});
			var existingAuthorIndex = _.indexOf(authorList, existingAuthor);
			authorList.splice(existingAuthorIndex, 1, action.author);
			AuthorStore.emitChange();
			break;
		case ActionTypes.DELETE_AUTHOR:
			_.remove(authorList, function(author){
				return action.id === author.id;
			});
			AuthorStore.emitChange();
			break;
		default:
			//no op
	}
});

module.exports = AuthorStore;
