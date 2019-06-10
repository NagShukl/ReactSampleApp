This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setting up project
### `git clone https://github.com/NagShukl/ReactBComm.git`
It will clone "ReactBComm" repository in parent folder
navigate to project directory
### cd ReactBComm
Then execute 
### `npm install`
It will download all the required dependencies and it will create node_modules inside ReactBComm project root folder.

## To launch application please execute
### `npm start`
It start application using port 3000, on your default browser.
You may launch your favorite browser and hit URL as 
  Local:            [http://localhost:3000](http://localhost:3000)

## Execute unit test associated, please execute 
### `npm test`
it may say "No tests found related to files changed since last commit"
because, the time you clone this repository there is no change in file, hence "npm test" will not execute any test.

## How to run Test suites after clone?
If you want to run all tests, right after clone, to enable this
I modified package.json to add "test-all" which allows to execute all test even if there is no change in file.
to use this please execute 
### `npm run test-all`

