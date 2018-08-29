# Not-Snake

:snake: Retro style game made entirelly for training the coding skills :snake:

## Live Demo

https://not-snake.localtunnel.me/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.



### Installing

Get into the repo and install all dependecies.

```
$ cd not-snake
$ npm install
```

Create one file named DBConf.js inside the folder src containing the following firebase configuration

```
var config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID"
  };

export default config
```

Save it and you are ready to go.

Run this command with your terminal

```
$ npm start
```

## Built With

* [React.js](https://reactjs.org/) - The web framework used
* [Firebase](https://firebase.google.com/) - Database
* [Ant](https://ant.design/) - Used for the styling
* [Konva](https://konvajs.github.io/) - Used for the game frame

## Authors

* **Manuel Scarapazzi** - *Initial work* 
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
