(function() {
  model.moddedGameFilters(['modded_no','modded_yes']);
  
  $gametmpl = $('#game-list div.modded'); console.log($gametmpl.attr('data-bind'));
  kobinding = $gametmpl.attr('data-bind') + ", style: { color: cheats_enabled ? '#f00' : ( mods_summary.length > 0 ? '#f80' : '#0f0' ) }";
  
  $gametmpl.attr('data-bind', kobinding);
})();