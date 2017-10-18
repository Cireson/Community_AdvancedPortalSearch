/* ----------------------------------------------------------------- */
/* ------------ Advanced Portal Search - User ---------------------- */
/* ----------------------------------------------------------------- */
// v8.1
// Contributors: William Udovich, Joivan Hedrick, Geoff Ross, Stefan Henseler
/* Description: Adds user search functionality to the main search of the portal, SQL style.*/

var customSearchUser 

function loadUserSearch() {
    if (typeof customSearchLib == 'undefined') {
        setTimeout(loadUserSearch, 100);//wait 100 millisecnds then recheck
		return;
	}
	customSearchUser = {

		// Init code of search box 
		initSearch: function (searchInput) {

			// Create datasource
			var dataSource = customSearchLib.initDataSource(this.initCriteria);

			// Set Template for list items
			var template = '<div class="k-item k-widget k-state-default "><span class="k-item" style="padding-left: 0px;"><b>UserName:</b> #: data.UserName # </br><b>Last Name:</b> #: data.LastName # </br><b>First Name: </b> #: data.FirstName # </br><b>Department: </b>#: data.Department #</span></div>';

			// enableCustomSearch
			customSearchLib.enableCustomSearch(searchInput, template, this.onSelect, dataSource) ;
		},

		// Criteria init code
		initCriteria: function (options) {
					
			var term = 	options.filter.filters[0].value;
			var strJsonCriteria = "&queryId=46418f86-376e-3690-2d25-befdbb2aa78e&searchterm=%27%25" + term + "%25%27";
			return strJsonCriteria;
					
		},
		
		onSelect: function (event,dataItem) {

			// Use the selected item or its text
			var url = '/user/UserRelatedInfoById/' + dataItem.Id;
			var newWindow = window.open(url, '_blank');
			newWindow.focus();

		}
	};
}

loadUserSearch();