/**
 * Name des Filter-Forms
 * @type {String}
 * @private
 *
 * @properties={typeid:35,uuid:"4B442655-47F5-4885-AC49-7BD14ABFBBAA"}
 */
var filterForm;

/**
 * @type {Object<Array<{dataType: Number, filterName: String, values: Array<Object>, names: Array<Object>, subselect: String, operator: String=}>>}
 * @protected
 * @properties={typeid:35,uuid:"CFCB6AE9-C6F3-4371-8324-D67D9C23326B",variableType:-4}
 */
var filter = {};

/**
 * @type {scopes.svyToolbarFilter.ListComponentFilterRenderer}
 *
 * @properties={typeid:35,uuid:"046CE15B-454E-419D-98CD-91FA58B30A08",variableType:-4}
 */
var toolbarFilter;


/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"F8FAE2AE-5745-484C-BA45-2A2972DCF052"}
 */
function onLoad(event) {
	var jsForm = solutionModel.getForm(controller.getName());
	var fields = jsForm.getFields(true);

	if (application.getApplicationType() === APPLICATION_TYPES.NG_CLIENT && elements['filterComponent']) {
		/** @type {RuntimeWebComponent<aggrid-groupingtable>} */
		var ngGrid = elements['groupingtable'];
		if (ngGrid) {
			var listComponent = elements['filterComponent'].containedForm.filterList;
			if (listComponent) {
				toolbarFilter = scopes.svyToolbarFilter.createFilterToolbar(listComponent, ngGrid);
				toolbarFilter.setOnFilterAddedCallback(onFilterAdded);
				toolbarFilter.setOnFilterRemovedCallback(onFilterRemoved);
				toolbarFilter.setOnFilterApplyCallback(onFilterApply);
			}
		}
	}
}


/**
 * Perform the element onclick action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"1F6AF270-5D25-4484-A1D6-BFD95EA98795"}
 */
function onAction_btnShowFilters(event) {
	if (!toolbarFilter) return;
	var filterPopupMenu = plugins.window.createPopupMenu();

	var toolbarPropName = 'toolbarfilter.' + controller.getName();
	/** @type {String} */
	var toolbarFilterProp = scopes.svyProperties.getPropertyValue(toolbarPropName);
	if (toolbarFilterProp) {
		/** @type {Array} */
		var toolbarFilters = JSON.parse(toolbarFilterProp);
		for (var i = 0; i < toolbarFilters.length; i++) {
			menuItem = filterPopupMenu.addMenuItem(toolbarFilters[i].name, onFilterRestore);
			menuItem.methodArguments = [toolbarFilters[i].filter];
		}
		filterPopupMenu.addSeparator();
		menuItem = filterPopupMenu.addMenuItem('Filter bearbeiten', popupMenuHelper);
		menuItem.methodArguments = [forms['dialog_edit_popup_filter']['dialogEditPopupFilter'], 'toolbarfilter.' + controller.getName()];
		if (!(activeFilters && activeFilters.length)) {
			filterPopupMenu.addSeparator();
		}
	}

	var menuItem = filterPopupMenu.addMenuItem("title");
	menuItem.enabled = false;
	menuItem.text = scopes.svyPopupFilter.LOCALE.filterPopupMenu.addFilter;

	var columnFilters = toolbarFilter.getFilters();	
	for (var index = 0; index < columnFilters.length; index++) {
		var columnFilter = columnFilters[index];
		var check = filterPopupMenu.addCheckBox(columnFilter.dataprovider);
		check.selected = toolbarFilter['isFilter' + 'Active'](columnFilter);
		check.text = columnFilter.text;
		check.methodArguments = [columnFilter.id, columnFilter.dataprovider]
		check.setMethod(scopes.svyToolbarFilter['onFilterPopupMenuClicked']);
	}
	
	var activeFilters = toolbarFilter.getActiveFilters();
	if (activeFilters && activeFilters.length) {
		filterPopupMenu.addSeparator();
		menuItem = filterPopupMenu.addMenuItem('Filter speichern', onFilterSave);
	}
	
	
	filterPopupMenu.cssClass = "toolbar-filter-popup";

	// cache the latest menu so it can be used in callback
	scopes.svyToolbarFilter['latestToolbarFilter'] = toolbarFilter;
	
	filterPopupMenu.show(event.getX(), event.getY());
}

/**
 * @protected
 *
 * @properties={typeid:24,uuid:"1F6C8E04-5999-4627-AAF5-184C16633131"}
 */
function onClick_filterList(entry, index, dataTarget, event) {
	toolbarFilter.onClick(entry, index, dataTarget, event);
}

/**
 * @param {scopes.svyToolbarFilter.Filter} tbFilter
 * @private 
 * @properties={typeid:24,uuid:"30A6F22C-7D26-48F3-BB27-F20791D8FE14"}
 */
function onFilterAdded(tbFilter) {
	var formComponent = elements['filterComponent'];
	if (formComponent && !formComponent.visible) {
		formComponent.visible = true;
		var ngGrid = elements['groupingtable'];
		if (ngGrid) ngGrid.setLocation(0, 40);
	}
	// Hier ggfs. Wertelisten überschreiben, bzw. in den vererbten Funktionen.
}

/**
 * @param {scopes.svyToolbarFilter.Filter} tbFilter
 * @private  
 * @properties={typeid:24,uuid:"0EFE1696-1046-4B19-B371-D43B9F731279"}
 */
function onFilterRemoved(tbFilter) {
	var formComponent = elements['filterComponent'];
	if (toolbarFilter && formComponent) {
		var filters = toolbarFilter.getFilters();
		var activeFilters = filters.filter(function(f) {
			return toolbarFilter['isFilter' + 'Active'](f);
		})
		if (!activeFilters || activeFilters.length === 0) {
			formComponent.visible = false;
			var ngGrid = elements['groupingtable'];
			if (ngGrid) ngGrid.setLocation(0, 0);
		}
	}
}

/**
 * @param {scopes.svyToolbarFilter.Filter} tbFilter
 * @protected   
 * @properties={typeid:24,uuid:"88042D55-C61E-4774-85F0-B958775520B5"}
 */
function onFilterApply(tbFilter) {
}

/**
 * @param {Number} itemIndex
 * @param {Number} parentIndex
 * @param {Boolean} isSelected
 * @param {String} parentText
 * @param {String} menuText
 * 
 * @protected 
 * 
 * @properties={typeid:24,uuid:"6955BF4F-D4A1-4DAB-B865-F953DCCBDBB8"}
 */
function onFilterSave(itemIndex, parentIndex, isSelected, parentText, menuText) {
	var input = scopes.svyCustomDialogs.showInputDialog('Filter speichern', 'Bitte geben Sie eine Bezeichnugn für den Filter ein:', '');
	if (input) {
		var toolbarState = toolbarFilter.getToolbarFiltersState();
		
		if (toolbarState) {
			for (var t = 0; t < toolbarState.length; t++) {
				var values = toolbarState[t].values;
				if (values) {
					for (var v = 0; v < values.length; v++) {
						if (values[v] instanceof UUID) {
							values[v] = values[v].toString();
						}
					}
				}
			}
		}
		
		var toolbarPropName = 'toolbarfilter.' + controller.getName();
		/** @type {String} */
		var toolbarFilterProp = scopes.svyProperties.getPropertyValue(toolbarPropName);
		
		var toolbarFilterEntry = {name: input, filter: toolbarState};
		var toolbarFilterArray;
		if (toolbarFilterProp) {
			toolbarFilterArray = JSON.parse(toolbarFilterProp);
			toolbarFilterArray.push(toolbarFilterEntry);
		} else {
			toolbarFilterArray = [toolbarFilterEntry];
		}
		scopes.svyProperties.setUserProperty(toolbarPropName, JSON.stringify(toolbarFilterArray));
	}
}

/**
 * @param {Number} itemIndex
 * @param {Number} parentIndex
 * @param {Boolean} isSelected
 * @param {String} parentText
 * @param {String} menuText
 * @param {Array<{
 *			id: String,
 *			dataprovider: String,
 *			operator: String,
 *			params: Object,
 *			text: String,
 *			values: Array}>} jsonState
 *
 * @properties={typeid:24,uuid:"446A899E-3C3C-4038-994E-6AE34398E8D4"}
 */
function onFilterRestore(itemIndex, parentIndex, isSelected, parentText, menuText, jsonState) {
	if (toolbarFilter) {
		toolbarFilter.restoreToolbarFiltersState(jsonState);
	}
}