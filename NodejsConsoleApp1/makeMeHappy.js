/* 
This is as simple a Node.js script as possible.

It seeks to fulfill the same user story as the Machine Learning for Kids worksheet
'Make me happy' which is written in Scratch.

It assumes that a class has already completed the project in Scratch on the
website: https://machinelearningforkids.co.uk/#!/worksheets 

If the Scratch version of the worksheet is complete, then the student has a workspace_id, username, and password for Watson.
The student must have their model created and tested.These are needed for this script to work.

The file, example_config_file.txt, must be edited to include your actual workspace_id, username, and password and then renamed
config.json in the same direcory as makeMeHappy.js.

Each student will need to execute 'npm install watson_developer_cloud' for the proper Watson library.

The code was testing with Node 8.11.3

All credit is given to Dale Lane for the fantastic job he did with Machine Learning for Kids without entangling him in any
of my mistakes potentially here.

Direct corrections and suggestions for this Node.js code to: donniebryson@gmail.com 
*/
'use strict';
var AssistantV1 = require('watson-developer-cloud/assistant/v1');
const readline = require('readline');
// next line reads in the configuration which introduces you to Watson
var myConfig = require('./config.json');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var watsonAssistant = new AssistantV1({
    version: '2018-02-16',
    username: myConfig.username,
    password: myConfig.password
});

function extractOpinion(l) {
    var myIntent = l['intents'];
    if (myIntent && myIntent.length ) {
        var happySad = myIntent[0]['intent'];
        if (happySad == 'happy') {
            console.log("You make me happy!");
        } else {
            console.log("You make me sad!");
        }
    } else {
        console.log("Who knows what you think?");
    }
}

function checkInput(myInput) {
    var myReturn;
    watsonAssistant.message({
        workspace_id: myConfig.workspace_id,
        input: { 'text': myInput }
    }, function (err, response) {
        if (err)
            console.log('error:', err);
        else {
            extractOpinion(response);
        }

        });
}


rl.question('What do you think of Me? ', (answer) => {
    checkInput(answer);
    rl.close();
});

