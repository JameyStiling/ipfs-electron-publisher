// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var exec = require('child_process').exec;

$("#button").on("click", function() {
  alert("Are you ready to put your stuff on the dag?");
  // '/Users/jastiling/Documents/tempDaemon/index.html'
  addPublish($('#hashfile').val())
});

//ipfs command functions

function addPublish(abspathtofile) {
  let hashPath = ('ipfs add -r ' + abspathtofile)
  exec(hashPath, function(error, stdout, stderr) {
    publishHash(stdout.split(' ')[1]);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  })
}

//publishes the hash
function publishHash(hash) {
  let publishIt = 'ipfs name publish ' + hash;
  exec(publishIt, function(error, stdout, stderr) {
    let hashed = `http://gateway.ipfs.io/ipns/${stdout.split(' ')[2].slice(0, -1)}`
    console.log(hashed);
    $('#hashlink').text(hashed)
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  })
}

//Drag and drop to add to dag
document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
}

document.body.ondrop = (ev) => {
  console.log(ev.dataTransfer.files[0].path)
  $('#hashfile').val(ev.dataTransfer.files[0].path);
  ev.preventDefault()
}
