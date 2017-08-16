var request = require('request');
var github_user = 'projectforest';
var github_token = '547921871e07d0dc15dcd89e4cc89c70066235c8';
var fs = require('fs');
var user_agent = github_user;


console.log('Welcome to the github avatar downloader');


function getRepoContributors(repoOwner, repoName, cb){
  //let request_url = 'https://${github_user}:${github_token}@api.github.com/repos/${repoOwner}/${repoName}/contributors';
  var request_url = 'https://'+ github_user + ':' + github_token+ '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  let options = {
    url: request_url,
    headers: { 'User-Agent': user_agent }
  }

  request.get(options, function(err, response, body){
    if (err) throw err;
    console.log(JSON.parse(body));
  });

}

function cb(err, result){
  console.log("Errors: ", err);
  console.log("Result: ", result);
}
getRepoContributors('nodejs', "node", cb);

