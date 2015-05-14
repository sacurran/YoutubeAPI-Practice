var searchPool = new Array();

// After the API loads, call a function to enable the search box.

function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.

function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var responseString = JSON.stringify(response, '', 2);

    $('#search-container').html('<pre>' + responseString + '</pre>');
  });
}

function getSubs(callback) {
  var request = gapi.client.youtube.subscriptions.list({
    part: 'snippet',
    mine: true,
    maxResults: 50,
  });
  request.execute(function(response) {
    var channelIds = new Array();
    var responseString = JSON.stringify(response, '', 2);
    var length = Object.keys(response.items).length;
    for (var i = 0; i < length; i++) {
      channelIds.push(response.items[i].snippet.resourceId.channelId);
    }
    //$('#search-container').html('<pre>' + responseString + '</pre>');
    callback(channelIds);
  });
}

function addVideosFromChannel(channelId, callback) {
  var request = gapi.client.youtube.search.list({
    pageToken: "CGQQAA",
    part: 'id',
    channelId: channelId,
    maxResults: 50
  });


  request.execute(function(response) {
    var responseString = JSON.stringify(response, '', 2);
    if (response && response.items) {
      var length = Object.keys(response.items).length;
      for (var i = 0; i < length; i++) {
        callback(response.items[i].id.videoId);
      }
    }
    $('#search-container').html('<pre>' + searchPool.length + '</pre>');
  });
}

function addVideoToSearchList(videoId) {
  searchPool.push(videoId);
}

function getVideosForTopChannels(ids) {
  for (var i = 0; i < ids.length; i++) {
    addVideosFromChannel(ids[i], addVideoToSearchList);
  }
}

function main() {
  getSubs(getVideosForTopChannels);
}