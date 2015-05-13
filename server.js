var express = require('express');
var dirName= '/Users/stephanie/Dev/YoutubeAPI'; 

var server = express();
server.use(express.static(dirName+ '/public'));
 
var port = 10001;
server.listen(port, function() {
    console.log('server listening on port ' + port);
});