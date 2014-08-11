(function() {
    // list of known filters
    // TODO: find them programmatically by html inspection?
    var filterKeys = [
        'regionFilter',
        'gameStateFilter',
        'gameStatusFilter',
        'gameModeFilter',
        'planetCountMinFilter',
        'planetCountMaxFilter',
        'playerCountMinFilter',
        'playerCountMaxFilter',
        'gameTagFilter',
        'moddedGameFilter'
    ];
    
    // restore previously saved filters
    var filters = localStorage['fr.mereth.pa.savefilters'];
    if(filters) {
        console.log('mereth.savefilters: restoring => ' + filters);
        filters = JSON.parse(filters);
        for(var i = 0; i < filterKeys.length; ++i) {
            var filterkey = filterKeys[i];
            var filter = filters[filterkey]
            if(filter && model[filterkey]) {
                model[filterkey](filter);
            }
        }
    }
    
    // monitor filters changes
    model.msf_monitorFilters = ko.computed(function() {
        var filters = {};
        for(var i = 0; i < filterKeys.length; ++i) {
            var filterkey = filterKeys[i];
            if(model[filterkey]) {
                filters[filterkey] = model[filterkey]();
            }
            else {
                console.log('mereth.savefilters: filter key not found => ' + filterkey);
            }
        }
        return JSON.stringify(filters);
    });
    
    // save filters when they change
    model.msf_monitorFilters.subscribe(function(json) {
        console.log('mereth.savefilters: saving => ' + json);
        localStorage['fr.mereth.pa.savefilters'] = json;
    });
    
    // clear saved filters
    model.msf_clearFilters = function() {
        localStorage.removeItem('fr.mereth.pa.savefilters');
        api.Panel.message('game', 'navigate_to', 'coui://ui/main/game/server_browser/server_browser.html');
    };
    
    // add "Clear Filters" button
    var html = '<div style="border-top: 1px solid #333; margin: 8px 0px;" data-bind="click: msf_clearFilters">\
        <div class="btn_std" style="margin-top: 8px; width:100%;"> \
            <div class="btn_label" style="">\
                <loc data-i18n="server_browser:clear_filters.message" desc="">Clear Filters</loc>\
            </div>\
        </div>\
    </div>';
    $('div.section_controls').append(html);
})();