What's This?
------------
This is a starting place for a production-ready Instagram web app on the Backbone stack. Right now it hits up the Instagram API and fills a Backbone collection. Where it goes from there is up to you!

Getting Started
---------------

You should have a system running the grunt cli, node, npm, and bower. Then you can install project dependencies with

    npm install && bower install

You'll need to get your own [Instagram API key](http://instagram.com/developer/authentication/), and put in in a file called `.env.json` that looks like this:

	{
   	"client_id": "StaysMainlyInThePlain"
	}

Once you have your dependencies and you've specified your API key, you're ready to go. Just build and run the server by typing:

	grunt clean build server