(function() {
  model.moddedGameFilter('Any');
  
  $gametmpl = $('#game-list div.modded');
  kobinding = $gametmpl.attr('data-bind') + ", style: { color: cheats_enabled ? '#f00' : ( mods_summary.length > 0 ? '#f80' : '#0f0' ) }";
  
  $gametmpl.attr('data-bind', kobinding);
})();