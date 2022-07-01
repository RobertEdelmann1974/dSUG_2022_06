
/**
 * @param event
 * @override
 *
 * @properties={typeid:24,uuid:"F7A48DEE-7925-4627-B494-BF8CA0370185"}
 */
function onLoad(event) {
	_super.onLoad(event)
	toolbarFilter.addFilter('Preis einzelne Order','itemPrice',scopes.svyToolbarFilter.FILTER_TYPES.NUMBER);
	var filterItemPrice = toolbarFilter.addFilter('Produkt','itemname',scopes.svyToolbarFilter.FILTER_TYPES.TOKEN);
	filterItemPrice.text = 'anderer Text Produkt';
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
	case "itemPrice":
		application.output('operator: ' + operator);
		application.output('values: ' + values.join(' >-< '));
		/** @type {QBSelect<db:/example_data/order_details>} */
		var jOrderDetails = query.joins.add(datasources.db.example_data.order_details.getDataSource(), JSRelation.LEFT_OUTER_JOIN);
		if (operator == 'eq') {
			or.add(jOrderDetails.columns.unitprice.eq(utils.stringToNumber(values[0])));
		} else if (operator == 'gt') {
			or.add(jOrderDetails.columns.unitprice.gt(utils.stringToNumber(values[0])));
		} else if (operator == 'lt') {
			or.add(jOrderDetails.columns.unitprice.lt(utils.stringToNumber(values[0])));
		} else if (operator == 'lt') {
			or.add(jOrderDetails.columns.unitprice.lt(utils.stringToNumber(values[0])));
		} else if (operator == 'between') {
			or.add(jOrderDetails.columns.unitprice.between(utils.stringToNumber(values[0]), utils.stringToNumber(values[1])));
		}
		or = query.or;
		query.where.add(or);
		return false;
		break;
	default:
		break;
	}
	return true;
}

