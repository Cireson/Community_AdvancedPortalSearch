/* ----------------------------------------------------------------- */
/* ------------ Advanced Portal Search - Software Asset ------------ */
/* ----------------------------------------------------------------- */
// v8.1.RTM
// Contributors: William Udovich, Joivan Hedrick, Geoff Ross, Stefan Henseler, Seth Coussens
/* Description: Adds software asset search functionality to the navigation node, SQL style.*/

var customSearchSoftwareAsset

function loadSoftwareSearch() {
    if (typeof customSearchLib == 'undefined') {
        setTimeout(loadSoftwareSearch, 100);//wait 100 millisecnds then recheck
        return;
	}
	customSearchSoftwareAsset = {

		// Init code of search box 
		initSearch: function (searchInput) {	

			// Create datasource
			var dataSource = customSearchLib.initDataSource(this.initCriteria);

			// Set Template for list items
			var template = '<div class="k-item k-widget k-state-default "><span class="k-item" style="padding-left: 0px;"><b>Name:</b> #: data.Name # </br><b>Version:</b> #: data.Version # </br></div>';

			// enableCustomSearch
			customSearchLib.enableCustomSearch(searchInput, template, this.onSelect, dataSource);
		},

		// Criteria init code
		initCriteria: function (options) {
				
			var term = 	options.filter.filters[0].value;
			var strJsonCriteria = "&queryId=a9536080-a014-dc44-4a8b-96bfbfdda151&searchterm=%27%25" + term + "%25%27";
			return strJsonCriteria;
					
		},

		onSelect: function (event,dataItem) {

			// Use the selected item or its text
			var url = '/AssetManagement/SoftwareAsset/Edit/' + dataItem.Id;
			var newWindow = window.open(url, '_blank');
			newWindow.focus();

		}
	};
}

loadSoftwareSearch()