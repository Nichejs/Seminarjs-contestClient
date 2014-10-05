Seminarjs-contestClient
=======================

Client for the Seminarjs live Contest plugin. This will only work if there is a [Seminarjs](https://github.com/Nichejs/Seminarjs) server running with the [Contest plugin](https://github.com/Nichejs/Seminarjs-Contest) installed.

##Installation
Make sure you have Nodejs installed ([Download Nodejs](http://nodejs.org/download/))

First install the client:
```
npm install seminarjs-contestclient -g
```
>If you don't want it as a global package you can browse to the folder where you'll be developing the solutions, and install it locally there. The package exposes an executable, so you need access to that executable from the location of the contest files.

##Usage
To submit a solution all you have to do is:

```
seminarjsContest [host] [token] [solutionFilename.js]
```

##License
Code released under the MIT License
