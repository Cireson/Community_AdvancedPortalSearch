
/* ----------------------------------------------- */
/* ------------ Init Custom Portal Search ------------ */
/* ----------------------------------------------- */
// v8.1
// Contributors: William Udovich, Joivan Hedrick, Geoff Ross, Stefan Henseler, Seth Coussens, Cory Bowe
/* Description: Adds advanced search functionality to the main search of the portal, SQL style.*/

$(document).ready(function () {

    //Get a reference of the search input text box
    var searchInput = $("input[name=searchText]");

    //Add ID for css formating of the result list
    searchInput.attr('id', 'searchText');

    // Add Software Asset Search Type
    $(".navbar__search--dropdown ul").append('<li><a id="SoftwareAssetSearchType">Software Asset</a></li>');
    // Add Hardware Asset Search Type
    $(".navbar__search--dropdown ul").append('<li><a id="HardwareAssetSearchType">Hardware Asset</a></li>');
    // Add Hardware Asset Search Type
    $(".navbar__search--dropdown ul").append('<li><a id="UserSearchType">User</a></li>');

    function disableSearchKeys() {
        $("span.navbar__search--btn").hide();
        $("input[name=searchText]").unbind("keypress");
    }

    //Add Custom toggle event handling
    $(".dropdown-menu").on("click", "li", function (event) {

        var searchType = event.target.id;
        //console.log(event);

        // If Autocomplete already exists destroy, just do clean everything up... IT Monkey would love it!!
        if (searchInput.data("kendoAutoComplete")) {
            customSearchLib.disableCustomHeaderSearch(searchInput);
        }

        switch (searchType) {
            case "SoftwareAssetSearchType":
                customSearchSoftwareAsset.initSearch(searchInput);
                // Update Search Param and Concept
                var currentURL = window.location.href;
                var searchParam = $("input[name=search_param]"); //the hidden field which holds the search type id
                var searchConcept = $("span[id=search_concept]"); //the span field which displays the search type value      
                searchParam.val("SoftwareAsset");
                searchConcept.html('Software Asset');
                disableSearchKeys();
                break;
            case "HardwareAssetSearchType":
                customSearchHardwareAsset.initSearch(searchInput);
                // Update Search Param and Concept
                var currentURL = window.location.href;
                var searchParam = $("input[name=search_param]"); //the hidden field which holds the search type id
                var searchConcept = $("span[id=search_concept]"); //the span field which displays the search type value      
                searchParam.val("HardwareAsset");
                searchConcept.html('Hardware Asset');
                disableSearchKeys();
                break;
            case "UserSearchType":
                customSearchUser.initSearch(searchInput);
                // Update Search Param and Concept
                var currentURL = window.location.href;
                var searchParam = $("input[name=search_param]"); //the hidden field which holds the search type id
                var searchConcept = $("span[id=search_concept]"); //the span field which displays the search type value      
                searchParam.val("User");
                searchConcept.html('User');
                disableSearchKeys();
                break;
            default:
                $("span.navbar__search--btn").show();
                $("input[name=searchText]").keypress(function (event) {
                    if (event.keyCode == 13) {
                        app.headerSearchWorkItem();
                    }
                });
                break;
        }
    });

    if (typeof customSearchHardwareAsset == "undefined") {
        app.events.subscribe('customSearchHardwareAssetCreated', function () {
            init(searchInput)
        });
    }
    else {
        init(searchInput);
    }

    function init(searchInput) {
        if (session.user.AssetManager === 1) {
            customSearchHardwareAsset.initSearch(searchInput);
            // set Hardware Asset search as default if user is hardware asset manager
            var currentURL = window.location.href;
            var searchParam = $("input[name=search_param]"); //the hidden field which holds the search type id
            var searchConcept = $("span[id=search_concept]"); //the span field which displays the search type value      
            searchParam.val("HardwareAsset");
            searchConcept.html('Hardware Asset');
            disableSearchKeys();
        }
    };
});
