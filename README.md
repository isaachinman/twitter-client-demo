# Twitter Client Demo

### What is this?

This is a demonstration Node/Express/React/Redux app built as an interview excerise for a company who will remain unnamed.

### How do I run it?

1. Clone the repo
2. Run `npm i`
3. Run `npm start`

### How do I test it?

1. Run `npm test`

This test script will check the clientside bundle to ensure it is ES5 compliant, lint the entire repo, and then run any tests present with `jest`.

### Functionality

1. Connects with the Twitter API via oauth
2. Shows basic user data (profile picture, name, username)
3. Lists users recent tweets
4. Posts new tweets

### Notes

The dir structure of this repo should make it quite clear what is going on. Zero boilerplate was used in creating this demo. I started with an `npm init` and went from there, adding deps and files as needed.

I would never build a production application in this way, but it was a pretty interesting process. 

