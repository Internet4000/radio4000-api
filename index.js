const admin = require('firebase-admin')
const functions = require('firebase-functions')
const app = require('./src/app')

admin.initializeApp()

const {
	handleChannelDelete,
	handleChannelCreate
} = require('./functions/channel')
const {
	handleUserCreate,
	handleUserDelete
} = require('./functions/user')

const {database} = functions


exports.api = functions.https.onRequest(app)

exports.handleChannelCreate = database
	.ref('/channels/{id}')
	.onCreate(handleChannelCreate)

exports.handleChannelDelete = database
	.ref('/channels/{id}')
	.onDelete(handleChannelDelete)

exports.handleUserCreate = functions
	.auth.user().onCreate(handleUserCreate)

exports.handleUserDelete = functions
	.auth.user().onDelete(handleUserDelete)
