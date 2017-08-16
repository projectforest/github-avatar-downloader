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
    let data = JSON.parse(body);
    cb(err, data);
  });

}

function downloadImageByURL(url, filePath){
  request.get(url)
    .on('error', function(err){
      throw err;
    })
    .on('response', function(response){
      console.log(response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));
}

function cb(err, result){
  result.forEach(function(r){
    console.log(r.avatar_url);
  })
}
//getRepoContributors('nodejs', "node", cb);
downloadImageByURL('https://avatars1.githubusercontent.com/u/10393198?v=4', 'avatars/test123.jpg');

