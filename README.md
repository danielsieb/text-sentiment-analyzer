# BASE Fireword Code Exercise

## Problem Description

We need to be able to detect potentially dangerous language in the text that a user types so that we can alert someone to get them help. This can seem somewhat dark, but it can be critical to protecting people.

Your task is to modify the current alorgithm (located in `./src/check-firewords.js`) so that the UI will show all matches of potentially dangerous language found within the text that is submitted.

Analyzing language is difficult, so expect to have some false positives. The goal is to minimize the number of false positives while also not missing any dangerous language. Several sample texts are available for you to test your algorithm on. But you should also test other text on your own. For the purpose of this exercise, please only detect the following words/phrases (in any tense): `kill`, `die`, `suicide`, `hate myself`, and `blow up`.

## Getting Started

Install the dependencies (`npm install`), and start up the app by running `npm start`.

You will be able to open the app in your browser at `http://localhost:3000`.

There are two pieces of the code base that you should contribute to (search for `TODO` in the source code):

1. The `checkFirewords` function
2. The output of the fireword detection message in `./src/App.js`

After completing the work on the code, please update this README with details of what trade-offs you made or what limitations your solution has.

You may add tests or other documentation where you see fit. You could also make the `checkFirewords` method invoke a remote API to simulate/demonstrate a call to a backend. However, neither of those things are required.

The last step is to zip up the repository (exclude the `node_modules` and `.git` folders) with your changes and email the zip file back to us so that we can review your work.

Please do not spend a lot of time on this. If you get stuck, just submit what you have.

## Trade-offs

Due to the complexity and time restriction on this app, the area of use is limited to texts with the specific firewords
used in this exercise.

The Google NLP API Sentiment Score might help to get an overall feel of the emotion in the text but it is a "black box"
for the end user.

## Limitations

The list of firewords used in this app is quite limited. Hence, dangerous texts could still be interpreted as harmless due to missing firewords.

The firewords could also have many possible meanings (good or bad) which increases the number of false positives 
--> Polysemy.

