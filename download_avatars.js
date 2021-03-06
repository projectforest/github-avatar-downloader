require('dotenv').config();
var request = require('request');
var github_user = process.env.GITHUB_USER;
var github_token = process.env.GITHUB_TOKEN;
var fs = require('fs');
var user_agent = github_user;


if (process.argv.length !== 4) {
  throw "error: repo directory and owner required";
}
else {
    var owner = process.argv[2];
    var repo = process.argv[3];
}

console.log('Welcome to the github avatar downloader');


function getRepoContributors(repoOwner, repoName, cb){

  var request_url = `https://${github_user}:${github_token}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  let options = {
    url: request_url,
    headers: { 'User-Agent': user_agent }
  }

  request.get(options, function(err, response, body){
    if (err) throw err;
    let data = JSON.parse(body);
    cb(err, data);
  });

}

function downloadImageByURL(url, filePath){
  request.get(url)
    .on('error', function(err){
      throw err;
    })
    .pipe(fs.createWriteStream(filePath));
}

function cb(err, result){
  result.forEach(function(r){
    let avatarPath = 'avatars/' + r.login + '.jpg';
    downloadImageByURL(r.avatar_url, avatarPath);
  })
  console.log("Download complete");
}

getRepoContributors(owner, repo, cb);



