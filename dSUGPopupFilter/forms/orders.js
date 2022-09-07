
/**
 * @param event
 * @override
 *
 * @properties={typeid:24,uuid:"F7A48DEE-7925-4627-B494-BF8CA0370185"}
 */
function onLoad(event) {
	_super.onLoad(event)
	
	toolbarFilter.addFilter('Preis einzelne Order','orders_to_order_details.unitprice',scopes.svyToolbarFilter.FILTER_TYPES.NUMBER);
	toolbarFilter.addFilter('Produktname - Text','orders_to_order_details.order_details_to_products.productname',scopes.svyToolbarFilter.FILTER_TYPES.TOKEN);
	var filterItemSelect = toolbarFilter.addFilter('Auswahl Produkt','orders_to_order_details.productid',scopes.svyToolbarFilter.FILTER_TYPES.TOKEN);
	filterItemSelect.valuelist = 'products';
	toolbarFilter.setOnFilterApplyQueryCondition(onFilterQueryCondition);
}


/**
 * Überschreibt / ergänzt Filter
 * Wird für jeden Filter aufgerufen, Werte werden als Array "Values" übergeben
 * Ausschlusswerte als '%!=<Wert>'
 * 
 * @param {QBSelect<db:/example_data/orders>} query 
 * @param dataprovider
 * @param operator
 * @param {Array<String>} values
 * @param filter
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"D386D47A-6942-4825-9525-A3C105B77AEC"}
 */
function onFilterQueryCondition(query, dataprovider, operator, values, filter) {
	if (!values || !values.length) return true;
	var or;
	switch (dataprovider) {
	case "....":
		or = query.or;
// hier Query selber festlegen
		query.where.add(or);
		return false;
		break;
	default:
		break;
	}
	return true;
}

