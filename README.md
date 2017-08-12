# Radio4000 API

Public API to [Radio4000.com](https://radio4000.com) using Firebase realtime capabilities.

This API supports `GET` HTTP methods.


## Introduction

Thanks to Firebase the Radio4000 data can be accessed in realtime through this API, as well as classic REST. The [Firebase documentation](https://firebase.google.com/docs/) explains how you can access the data for various platforms: Web, Android, iOS, C++, Unity.

We welcome anyone to use the data, and help to improve the ecosystem.


## Folder structure

In this git repository you can find:

- `readme.md`: this document, presenting and explaining how to use Radio4000's API
- `database.rules.json`: Firebase's security rules. Those are the most precise definition of what can/should be done with the API


## URI and Versioning

The API can be found here: [https://radio4000.firebaseio.com](https://radio4000.firebaseio.com).

There is no versioning for this API as we have to follow and replicate any changes made at the Firebase level.


## Design

In Firebase, the `id` of a model is the root key of the object containing its properties.


### Endpoints and realtime

Most endpoints can be read without authentication.

Reading a user, a userSettings or writting to some models always requires authentication.

Here's a list of available REST endpoints and which model they correspond to:

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


## Models

Listed below are all available models and their properties.

- [user](#user)
- [userSetting](#usersetting)
- [channel](#channel)
- [channelPublic](#channelpublic)
- [image](#image)
- [track](#track)


### user

Requires authentication to read and write.

- channels [hasMany, string]: all radio channels a user has. We only allow one, for now.

example: `"-KYJykyCl6nIJi6YIuBO": true`

- created [integer]: timestamp describing when was this user created

example: `1481041965335`

- settings [string]: reference to the `userSetting` model id

example: `-KYJyixLTbITr103hovZ`


### userSetting

Requires authentication to read and write.

- user [belongsTo, string]: reference to the `user` model id

example: `"fAE1TRvTctbK4bEra3GnQdBFcqj2"`


### channel

Requires authentication to write.

- body: [string]: user description of the radio channel

example: `"The channel of your wet dreams, an ode to perfu..."`

- channelPublic [belongsTo, string]: reference to the `channelPublic` id of this radio channel

example: `"-JoJm13j3aGTWCT_Zbir"`

- created [integer]: timestamp describing when was this radio channel created

example: `"1411213745028"`

- favoriteChannels [hasMany, string]: list of all channels this radio has added as favorites

example: `"-JXHtCxC9Ew-Ilck6iZ8": true`

- images [hasMany, string]: all images added to a radio

example: `"-JoJypAujT2z0qcWnYjW": true`

- isFeatured [boolean]: is this radio channel featured on radio4000's homepage 

example: `false`

- isPremium [boolean]: has this radio channel been upgraded to premium
This property cannot be changed by the user. After paying the premium
fee, the Firebase functions backend will take care of switching it to `true`

example: `true`

- link [string]: URL describing the external homepage for a radio channel

example: `"https://example.com"`

- slug [string]: the unique "string id" representing this channel (used for human readable urls radio4000.com/slug)

example: `"oskar"`

- title [string]: title representing a radio channel

example: `"Radio Oskar"`

- tracks [hasMany, string]: list of `track` models offered by a radio channel

example: `"-J_GkkhzfbefhHMqV5qi": true`

- updated [integer]: timestamp describing when was this radio last updated

example: `1498137205047`


### channelPublic

`channelPublic` is a model always associated to a `channel` model. It is used so any authenticated user can associate data to a `channel`, when a `channel` can only be written by its owner. For exemple, adding a radio as follower will be done on the `channelPublic` model.

- channel [belongsTo, string]: `channel` model to which belongs this `channelPublic`

example: `"-JYEosmvT82Ju0vcSHVP"`

- followers [hasMany, string]: list of `channel` models following this radio

example: `"-JXHtCxC9Ew-Ilck6iZ8": true`


### image

- channel [belongsTo, string]: `channel` model to which this image belongs.

example: `"-JYZtdQfLSl6sUpyIJx6"`

- src [string]: `id` of the `cloudinary` model which stores this image data.

example: `"czepsdiizx5gx10gnufe"`

todo: explain cloudinary


### track

- body [string]: optional user description of a track

example: `"Post-Punk from USA (NY)"`

- channel [belongsTo, string]: the channel to which a track belongs to

example: `"-K9RmTg2B3gqldaFnART"`

- created [integer]: timestamp describing when was created a track model

example: `1478878156138`

- title [string]: title describing a track model

example: `"Lydia Lunch - This Side of Nowhere (1982)"`

- url [string]: the URL pointing to the provider serving the track media (Youtube only for now)

example: `"https://www.youtube.com/watch?v=5R5bETC_wvA"`

- ytid [string]: provider id of a track media (Youtube only for now)

example: `"5R5bETC_wvA"`


## List of projects using the Radio4000 API.

- [radio4000.com](https://github.com/internet4000/radio4000): the main website use this exact API via the JavaScript SDK.
- [radio4000-player-vue](https://github.com/internet4000/radio4000-player-vue): the media player used by radio4000.com is a vue.js project communicating with this API via REST.

Do you want your project to appear here? Send a pull request or get in touch!


## Frequently and not-frequently asked questions (FAQNFAQ)

- Why Firebase?

Firebase allowed this project to come to life without having the need to spend time building and maintaining backend software. It also allows us to be more secure we think we could be on our own, handling the storage and protection of user's sensitive data. In a perfect world we would like to have a backend that we fully control, running only free and open source softwares. The future will be great.

# Radio4000 Embed API

This is the API for creating iframe and oEmbeds for Radio4000 channels. It uses Node.js and Express.js.

## Endpoints

List of all available endpoints on https://embed.radio4000.com.

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

## Developing

Clone the repository, cd into it and install dependencies with `yarn install`. Then do `yarn run` to see which commands are available.

### Firebase

Make sure you have installed the Firebase tools:

1. `yarn global add firebase-tools`
2. `firebase login`

Then to start a server:

- `firebase serve --only functions,hosting`

This will start two local servers. One for functions, one for hosting.

To deploy it, run:

- `firebase deploy --only functions`
>>>>>>> embed/master
