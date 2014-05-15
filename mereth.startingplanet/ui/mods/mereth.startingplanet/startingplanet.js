(function() {
  var oldProcessGameBeacon = model.processGameBeacon;
  model.processGameBeacon = function(beacon, host_id) {
    var game = oldProcessGameBeacon(beacon, host_id);
    
    var p = new Array();
    _.forEach(beacon.game.system.planets,function(planet) {
        p.push({
            'name' : (planet.name.length < 16 ? planet.name : planet.name.substring(0,15)+'...'), 
            'biome' : planet.generator.biome,
            'move_thrust' : planet.required_thrust_to_move,
            'scale' : model.planetSizeClass(planet.generator.radius),
            'start' : planet.starting_planet
        });
    });
    game.planet_detail = p;
    
    return game;
  };

  $("div.planet-name").attr("data-bind", "text: $data.name, style: { color: $data.start ? 'green' : '' }");
  
  $("#game-list-header .game").append("<span data-bind=\"text: ' ' + filteredGameList().length + '/' + gameList().length\"></span>");
})();