(function() {
  $('#contextMenu ul').append('<li><a data-bind="click: model.showReplay" tabindex="-1" href="#"><span class="menu-action">Show Replay</span></a></li>');
  
  model.showReplay = function showReplay(user) {
    var uberId = user.uberId();
    var url = 'coui://ui/main/game/replay_browser/replay_browser.html?showUberId=' + uberId
    api.Panel.message('game', 'navigate_to', url);
  };
})();