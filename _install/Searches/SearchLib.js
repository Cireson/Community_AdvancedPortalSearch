
/* ----------------------------------------------- */
/* ------------ Advanced Portal Search - Lib ------------ */
/* ----------------------------------------------- */
// v8.1
// Contributors: William Udovich, Joivan Hedrick, Geoff Ross, Stefan Henseler, Seth Coussens
/* Description: Contains shared code for the advanced portal search */


// Some common functions which should be used for all search extensions
var customSearchLib = {
	
		// Formats the specified text within the itemtext object bold and red. This is used to highlight all matches in the results list.
		formatValue: function (itemText, text) {
				var textMatcher = new RegExp(text, "ig");
						//console.log(itemText)	
				var text = itemText.replace(textMatcher, function(match) {
					return "<strong style='color: red;'>" + match + "</strong>";
				})			
				//console.log(text)
				return  text;
		},
		// Making sure the kendo autocomplete is removed from the control.
		disableCustomHeaderSearch: function (searchInput) {
			//Disable autocomplete
			 searchInput.data("kendoAutoComplete").close();
			 searchInput.data("kendoAutoComplete").destroy();
						   
		},
	
		// This enables the autocomplete search using the template and the datasource specified
		enableCustomSearch: function (searchInput, template, onSelect, dataSource) {
			
			searchInput.kendoAutoComplete({
				headerTemplate: '<div class="noDataMessage" style="margin-left:10px"><h3>No results found</h3></div>',	// use header if nothing is found...		
				template: template,
				filter: "contains",
				placeholder: "Please enter a search term ...",
				minLength: 3,
				delay: 1000,
				width: 600,
				height: 800,
				filtering: function (obj) {		
					// show progress
					 kendo.ui.progress($(".navbar__search--input"), true);
								
				},				
				dataBound : function (obj) {
					// hide progress
					kendo.ui.progress($(".navbar__search--input"), false);
	
					//Show Loading Spinner
					this.list.find(".k-loading-mask").hide();
				
					var noItems = this.list.find(".noDataMessage");
				
					// Check if result contains items
					if (!this.dataSource.view()[0]) {
						noItems.show();
						this.popup.open();
					} else {
						noItems.hide();
	
						// Highlight Search Text
						var userTxt = obj.sender.value();
						var listItems = obj.sender.ul.children();
						if (listItems.length > 0 && userTxt.length > 1) {
							$(listItems).each(function (i, e) {
								var liTxt = e.children[0].children[0].innerHTML;
								e.children[0].children[0].innerHTML = customSearchLib.formatValue(liTxt, userTxt);
							});
						
						}
					}
				},				
				animation: {
					close: {
						effects: "fadeOut",
						duration: 300
					},
					open: {
						effects: "fadeIn",
						duration: 300
					}
				},
				close: function(e) {
					var widget = e.sender;
	
					if (!widget.shouldClose && !this.dataSource.view()[0]) {
						e.preventDefault();
					}				
					
				},
				highlightFirst: true,
				dataSource: dataSource,
				select: function (e) {	
	
					var dataItem = this.dataItem(e.item.index());
	
					// Execute user behavior
					onSelect(e,dataItem);			
	
					// Empty the input field					
					$('#list').append("<li>" + dataItem + "</li>");
					searchInput.data("kendoAutoComplete").value("");
					e.preventDefault();
				}					
				
			});
	
			// Close results popup
			searchInput.on("blur", function() {
	
				searchInput.data("kendoAutoComplete").shouldClose = true;
				//searchInput.data("kendoAutoComplete").close();
				searchInput.data("kendoAutoComplete").shouldClose = false;
	
				// Hide no items div if loose focus
				var noItems = searchInput.find(".noDataMessage");
				noItems.hide();    
	
			});
	
			// Update Search if input box content changes
			// searchInput.on('keyup', function (e) {
	
			// 	var assetSearchText = searchInput.val(); //Get the value that the user typed in. 
			// 	console.log(assetSearchText)
			// 	//If the autocomplete text is empty, then allow default OOB behavior. Otherwise, disable the OOB mouseout.
			// 	if (!(assetSearchText == "" || assetSearchText == "B" || assetSearchText == "BA" || assetSearchText == "BAM" | assetSearchText == "BAM-" || assetSearchText == "BAM-L" || assetSearchText.length < 3)) {
			// 		console.log("search")
			// 		//searchInput.data("kendoAutoComplete").search(assetSearchText);
			// 	};
				
			// });	
	
			// var assetSearchText = searchInput.val(); //Get the value that the user typed in. 
	
			// //force search if box is not empty and has at least a length of 3
			// if ((assetSearchText != "" || assetSearchText != "B" || assetSearchText != "BA" || assetSearchText != "BAM" | assetSearchText != "BAM-" || assetSearchText != "BAM-L") && assetSearchText.length > 2) {
			// 	searchInput.data("kendoAutoComplete").search(assetSearchText);
			// 	console.log("here")
			// };	
							
		},
	
		// Data Source Init code
		initDataSource: function (initCriteria) {
	
			// define datasource
			var dataSource = new kendo.data.DataSource({
					//type: "json",
					serverFiltering: true,
					transport: {
						read: {
							type: "GET",
							url: "/api/v3/Dashboard/GetDashboardDataById/",
							contentType: 'application/json; charset=UTF-8',
							//dataType: "json"
						} ,
						parameterMap: function (options, operation) {                                       
							
							// Just for debugging...
							var criteria = initCriteria(options) 
	
							return "dateFilterType=NoFilter" + criteria;
						} 
					}
				});		
	
			return dataSource;
	
		}
	}