// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, getChannelsForUser);
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

function getChannelsForUser(user) {
    var url = baseurl + '/channels?part=id&forUsername=StephanieAnnaCurran';
    console.log(url);
}