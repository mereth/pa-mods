(function() {
  // add starttime to the model
  var oldProcessReplay = model.processReplay;
  model.processReplay = function(beacon, host_id, origGameInfo) {
    var replay = oldProcessReplay(beacon, host_id, origGameInfo);
    replay.starttime = origGameInfo.MatchBeginTimeString;
    return replay;
  };
  
  // replace LobbyId column by StartTime
  $('#game-list div.lobbyid').attr('data-bind', 'text: starttime');
  $('#game-list-header div.lobbyid').text('StartDate');
  
  // fix updateReplayData spam
  model.replayListSortOrder = ko.observable([]);
  model.replayListScope = ko.observable([]);
  model.replayListScope.subscribe(function (arr) {
      var newvalue = (arr.length > 0) ? arr[0] : model.defaultReplayListScope;
      console.log(newvalue);
      if(model.currentReplayListScope != newvalue) {
        console.log(model.currentReplayListScope);
        model.currentReplayListScope = newvalue;
        model.updateReplayData();
      }
  });
  model.replayListSortOrder.subscribe(function (arr) {
      var newvalue = (arr.length > 0) ? arr[0] : model.defaultReplayListSortOrder;
      if(model.currentReplayListSortOrder != newvalue) {
        model.currentReplayListSortOrder = newvalue;
        model.updateReplayData();
      }
  });
  
  // handle the showUberId parameter (from uberbar "show replay")
  var showUberId =  $.url().param('showUberId');
  var displayName = $.url().param('displayName');
  if(showUberId) {
    model.replayListSortOrder = ko.observable([]);
    model.currentReplayListScope = "Mine";
    model.replayListScope(["Mine"]);
    model.uberId = ko.observable(showUberId);
    $('#replay-list-scope > option')[1].text = decodeURI(displayName);
  }
})();