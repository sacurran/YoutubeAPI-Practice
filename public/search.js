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
   // document.getElementById('response').innerHTML += responseString;
    $('#search-container').html('<pre>' + responseString + '</pre>');
  });
}