var request = require('request');
var github_user = "projectforest";
var github_token = "547921871e07d0dc15dcd89e4cc89c70066235c8";


console.log('Welcome to the github avatar downloader');


function getRepoContributors(repoOwner, repoName, cb){
  var request_url = "https://" + github_user + ':' + github_token + "@api.github.com/repos/" + repoOwner + '/' + repoName + '/contributors';
  console.log(request_url); 
}

function cb(err, result){
  console.log("Errors: ", err);
  console.log("Result: ", result);
}
getRepoContributors('nodejs', "node", cb);