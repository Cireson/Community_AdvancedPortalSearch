/* ----------------------------------------------------------------- */
/* ------------ Advanced Portal Search - Hardware Asset ------------ */
/* ----------------------------------------------------------------- */
// v8.1
// Contributors: William Udovich, Joivan Hedrick, Geoff Ross, Stefan Henseler, Seth Coussens
/* Description: Adds hardware asset search functionality to the navigation node, SQL style.*/

var customSearchHardwareAsset

function loadHardwareSearch() {
    if (typeof customSearchLib == 'undefined') {
        setTimeout(loadHardwareSearch, 100);//wait 100 millisecnds then recheck
        return;
    }
	customSearchHardwareAsset = {

		// Init code of search box 
		initSearch: function (searchInput) {
		
			// Create datasource
			var dataSource = customSearchLib.initDataSource(this.initCriteria);

			// Set Template for list items
			var template = '<div class="k-item k-widget k-state-default "><span class="k-item" style="padding-left: 0px;"><b>Name:</b> #: data.Name # </br><b>Serial:</b> #: data.SerialNumber # </br></div>';

			// enableCustomSearch
			customSearchLib.enableCustomSearch(searchInput, template, this.onSelect, dataSource);
		},

		// Criteria init code
		initCriteria: function (options) {
					
			var term = 	options.filter.filters[0].value;
			var strJsonCriteria = "&queryId=ce6aa11b-286d-eee1-e308-495dcd912095&searchterm=%27%25" + term + "%25%27";
			return strJsonCriteria;
					
		},
		
		onSelect: function (event,dataItem) {

			// Use the selected item or its text
			var url = '/AssetManagement/HardwareAsset/Edit/' + dataItem.Id;
			var newWindow = window.open(url, '_blank');
			newWindow.focus();

		}
	};	
}

loadHardwareSearch();