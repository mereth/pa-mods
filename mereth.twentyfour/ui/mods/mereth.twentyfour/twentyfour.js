(function() {
  // we can't do anything against model.time auto update...
  model.time24 = ko.observable();
  setInterval(function () {
      var d = new Date();
      var hh = d.getHours(),
          MM = d.getMinutes();
      
      model.time24((hh < 10 ? '0' : '') + hh + (MM < 10 ? ':0' : ':') + MM);
  }, 5000); // refresh every 5s is good enough
  
  $('div.clock').attr('data-bind', 'text: time24');
})();