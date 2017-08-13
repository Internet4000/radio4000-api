# Radio4000 API

This is the documentation and public API to [Radio4000.com](https://radio4000.com). We welcome anyone to use the data, and help to improve the ecosystem.

In this repository you can find:

- [Firebase API](#firebase-api)
- [Rules](#rules) 
- [Endpoints](#endpoints) 
- [Models](#models)  
- [Development](#development) 
- [Deployment](#deployment)  
- [FAQ](#frequently-and-not-frequently-asked-questions-faqnfaq)

## Firebase API

- [https://radio4000.firebaseio.com](https://radio4000.firebaseio.com)

Thanks to Firebase the Radio4000 data can be accessed in realtime through this API, as well as classic REST. The [Firebase documentation](https://firebase.google.com/docs/) explains how you can access the data for various platforms: Web, Android, iOS, C++, Unity. This API supports `GET` HTTP methods.

There is no versioning for this API as we have to follow and replicate any changes made at the Firebase level. Note that Firebase stores arrays as objects where the key of each object is the `id` of the model.

### Rules

The Firebase security rules can be found in `database.rules.json`. This is the most precise definition of what can and should be done with the API.

### Endpoints

Most endpoints can be read without authentication.

Reading a user, a userSettings or writting to some models always requires authentication.

Here's a list of available REST endpoints and their corresponding model:

* `/users` serves the `user` models
	* [https://radio4000.firebaseio.com/users/{id}.json](https://radio4000.firebaseio.com/users/{id}.json)

- `/userSettings` serves the `userSetting` models
	- [https://radio4000.firebaseio.com/userSettings/{id}.json](https://radio4000.firebaseio.com/userSettings/{id}.json)

- `/channels` serves the `channel` models
	- [https://radio4000.firebaseio.com/channels.json](https://radio4000.firebaseio.com/channels.json)
	- [https://radio4000.firebaseio.com/channels/{channelId}.json](https://radio4000.firebaseio.com/channels/{id}.json)

- `/channelPublics` serves the `channelPublic` models
	- [https://radio4000.firebaseio.com/channelPublics/{id}.json](https://radio4000.firebaseio.com/channelPublics/{id}.json)

- `/images` serves the `image` models
	- [https://radio4000.firebaseio.com/images/{id}.json](https://radio4000.firebaseio.com/images/{id}.json)

- `/tracks` serves the `track` models
	- [https://radio4000.firebaseio.com/tracks.json](https://radio4000.firebaseio.com/tracks.json)
	- [https://radio4000.firebaseio.com/tracks/{id}.json](https://radio4000.firebaseio.com/tracks/{id}.json)


For *realtime* database access, you should refer to the [Firebase SDK](https://firebase.google.com/docs/) available for your platform.

## Custom endpoints

These endpoints are available at https://api.radio4000.com. This is a node.js API in `src/app.js`. 

### /iframe

- `/iframe?slug={radio4000-channel-slug}`

Returns an `HTML` document with an instance of the [radio4000-vue-player](https://github.com/internet4000/radio4000-player-vue).

This endpoint is meant to be used as the `src` of our `<iframe>` embeds. To get the HTML for the iframe embed, visit the `/oembed` endpoint and see the `html` property. The HTML template returned is here: `/templates/embed.html`.

## /oembed

- `/oembed?slug={radio4000-channel-slug}`

Returns a `JSON` object following the [oEmbed spec](http://oembed.com/) for a Radio4000 channel.

With this, we can add a meta tag to each channel to get rich previews when the link is shared. Like this:

```html
<link rel="alternate" type="application/json+oembed" href="https://embed.radio4000.com/oembed?slug=200ok" title="200ok">
```

Here's an example of what is returned:

```json
{
  "version": "1.0",
  "type": "rich",
  "provider_name": "Radio4000",
  "provider_url": "https://radio4000.com/",
  "author_name": "200ok",
  "author_url": "https://radio4000.com/200ok/",
  "title": "200ok",
  "description": "Textures, drums, breaks and grooves #am to #pm",
  "thumbnail_url": "https://assets.radio4000.com/radio4000-icon.png",
  "html": "<iframe width=\"320\" height=\"400\" src=\"https://embed.radio4000.com/iframe?slug=200ok\" frameborder=\"0\"></iframe>",
  "width": 320,
  "height": 400
}
```

## Models

Listed below are all available models and their properties. Also see this folder https://github.com/internet4000/radio4000/tree/master/app/models.

- [user](#user)
- [userSetting](#usersetting)
- [channel](#channel)
- [channelPublic](#channelpublic)
- [image](#image)
- [track](#track)

### user

Requires authentication to read and write.

|name|type|description|
|----|----|----|
|channels|`hasMany`|All radio channels belonging to a user. We only allow one, for now. Example: `{"-KYJykyCl6nIJi6YIuBO": true}`|
|created|`integer`|timestamp describing when was this user created. Example: `1481041965335`|
|settings|`belongsTo`|relationship with the `userSetting` model. Example: `-KYJyixLTbITr103hovZ`|

### userSetting

Requires authentication to read and write.

|name|type|description|
|----|----|----|
|user|belongsTo (string)|Relationship to a single `user` model. Example: `"fAE1TRvTctbK4bEra3GnQdBFcqj2"`|

### channel

Requires authentication to write.

|name|type|description|
|----|----|----|
|body|`string`|user description of the radio channel. Example: `"The channel of your wet dreams, an ode to perfu..."`|
|channelPublic|`belongsTo`|reference to the `channelPublic` id of this radio channel. Example: `"-JoJm13j3aGTWCT_Zbir"`|
|created|`integer`|timestamp describing when was this radio channel created. Example: `"1411213745028"`|
|favoriteChannels|`hasMany`|list of all channels this radio has added as favorites. Example: `"-JXHtCxC9Ew-Ilck6iZ8": true`|
|images|`hasMany`|all images added to a radio. Example: `"-JoJypAujT2z0qcWnYjW": true`|
|isFeatured|`boolean`|is this radio channel featured on radio4000's homepage . Example: `false`|
|link|`string`|URL describing the external homepage for a radio channel. Example: `"https://example.com"`|
|slug|`string`|the unique "string id" representing this channel (used for human readable urls radio4000.com/slug). Example: `"oskar"`|
|title|`string`|title representing a radio channel. Example: `"Radio Oskar"`|
|tracks|`hasMany`|list of `track` models offered by a radio channel. Example: `"-J_GkkhzfbefhHMqV5qi": true`|
|updated|`integer`|timestamp describing when was this radio last updated. Example: `1498137205047`|

### channelPublic

`channelPublic` is a model always associated to a `channel` model. It is used so any authenticated user can associate data to a `channel`, when a `channel` can only be written by its owner. For exemple, adding a radio as follower will be done on the `channelPublic` model.

|name|type|description|
|-|-|-|
|channel|`belongsTo` (`string`)|`channel` model to which belongs this `channelPublic`. Example: `"-JYEosmvT82Ju0vcSHVP"`|
|followers|`hasMany`|list of `channel` models following this radio. Example: `"-JXHtCxC9Ew-Ilck6iZ8": true`|

### Image

|name|type|description|
|-|-|-|
|channels|belongsTo, string|relationship to the `channel` model|
|src|string|`id` of the `cloudinary` model which stores this image data.|

todo: explain our integration of the Cloudinary service.

### Track

|name|type|description|
|-|-|-|
|body|`string`|optional description to the track. Example: `"Post-Punk from USA (NY)"`|
|channel|`belongsTo` (string)|relationship to `channel` model|
|created|`integer`|date timestamp from when the model is created|
|title|`string`|required title of the track. Example: `"Lydia Lunch - This Side of Nowhere (1982)"`|
|url|`string`|the URL pointing to the provider serving the track media (YouTube only). Example: `"https://www.youtube.com/watch?v=5R5bETC_wvA"`|
|ytid|`string`|provider id of a track media (YouTube only). Example: `"5R5bETC_wvA"`|

## Installation, Development and Deployment

To install, you'll need node.js and git. Then run:

```
git clone git@github.com:internet4000/radio4000-api.git
cd radio4000-api
yarn; cd src; yarn; cd ..
```

To start a local development server, run

- `yarn start`  
- `firebase serve --only hosting,functions`

To deploy to Firebase, make sure you have the Firebase tools installed:

1. `yarn global add firebase-tools`
2. `firebase login`

Then you can deploy either the API or the rules:

- `yarn deploy-api`
- `yarn deploy-rules`

Deploying the API will update https://api.radio4000.com.  
Deploying the rules will push `database.rules.json` to the production instance of Radio4000.

## Frequently and not-frequently asked questions (FAQNFAQ)

**Why Firebase?**
Firebase allowed this project to come to life without having the need to spend time building and maintaining backend software. It also allows us to be more secure we think we could be on our own, handling the storage and protection of user's sensitive data. In a perfect world we would like to have a backend that we fully control, running only free and open source softwares. The future will be great.

**Which projects use the Radio4000 API?**

- [radio4000.com](https://github.com/internet4000/radio4000): the main website use this exact API via the JavaScript SDK.  
- [radio4000-player](https://github.com/internet4000/radio4000-player): the media player used by radio4000.com is a vue.js project communicating with this API via REST.

Do you want your project to appear here? Send a pull request or get in touch!
