(function() {
  // add starttime to the model
  var oldProcessReplay = model.processReplay;
  model.processReplay = function(beacon, host_id, origGameInfo) {
    var replay = oldProcessReplay(beacon, host_id, origGameInfo);
    replay.starttime = origGameInfo.MatchBeginTimeString;
    return replay;
  };
  
  // resize buildVersion column
  $('#game-list-header div.buildVersion.col-md-3').removeClass('col-md-3').addClass('col-md-1');
  $('#game-list div.buildVersion.col-md-3').removeClass('col-md-3').addClass('col-md-1');
  // add StartTime column
  $('#game-list-header div.duration').after('<div class="col-md-2 starttime">StartTime</div>');
  $('#game-list div.duration').after('<div class="col-md-2 starttime" data-bind="text: starttime"></div>');
  
  // handle the showUberId parameter (from uberbar "show replay")
  var showUberId =  $.url().param('showUberId');
  var displayName = $.url().param('displayName');
  if(showUberId) {
    // replace your uberId by the targeted contact uberId
    model.uberId = ko.observable(showUberId);
    
    // switch to "Mine" scope
    // and recreate the observable to avoid duplicate updateReplayData call 
    model.replayListScope = ko.observable("Mine");
    model.replayListScope.subscribe(function () {
        model.updateReplayData();
    });
    
    // update 'My Games Only' option label to the targeted contact name
    var option = $($('#replay-list-scope > option')[1]);
    if(option) {
        var $option = $(option);
        $option.removeAttr('locattr');
        $option.removeAttr('locdata');
        $option.text(decodeURI(displayName));
    }
  }
})();