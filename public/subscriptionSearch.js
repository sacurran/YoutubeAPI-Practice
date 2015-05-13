

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
    var request =gapi.client.youtube.subscriptions.list({
       part: 'snippet',
       mine: true,
       maxResults: 50,
    });
    request.execute(function(response) {
    var channelIds= new Array();
    var responseString = JSON.stringify(response, '', 2);
    var length = Object.keys(response.items).length;
    for(var i=0;i<length;i++)
    {
        channelIds.push(response.items[i].snippet.resourceId.channelId);
    }
    console.log(channelIds.length);
    $('#search-container').html('<pre>' + responseString + '</pre>');
    callback(channelIds);
  });
}

function addVideosFromChannel(videoIds, channelId)
{
    console.log("The channel we used: "+ channelId);
    var request = gapi.client.youtube.search.list({
       part: 'snippet',
       channelId: channelId,
       maxResults: 50
    });

    
    request.execute(function(response) {
    var length = Object.keys(response.items).length;
    for(var i=0;i<length;i++)
    {
        console.log()
    }   
        
        
    var responseString = JSON.stringify(response, '', 2);
    var length = Object.keys(response.items).length;
   $('#search-container').html('<pre>' + responseString + '</pre>');
  });
}


function getVideosForTopChannels(ids)
{
    videoIds = [];
    addVideosFromChannel(videoIds,ids[0]);
    
}

function main()
{
    getSubs(getVideosForTopChannels);
}