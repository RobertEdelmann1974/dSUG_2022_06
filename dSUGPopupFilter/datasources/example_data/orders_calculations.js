/**
 * @properties={type:8,typeid:36,uuid:"0FCA54FE-FBE4-417D-8889-847E319EB2CD"}
 */
function order_total() {
	var total = 0;
	for (var i = 1; i <= orders_to_order_details.getSize(); i++) {
		var record = orders_to_order_details.getRecord(i);
		total += record.subtotal;
	}
	return total + freight;
}

/**
 * @properties={type:12,typeid:36,uuid:"4D38F188-7F62-48FE-A1D8-6190839E61CD"}
 */
function displayAddress() {
	return [shipaddress,
	shipcity,
	shipcountry + ' ' + shippostalcode].join('\n')
}

/**
 * @properties={type:12,typeid:36,uuid:"05DE9F71-FA40-4681-ADC8-BF6E39E26992"}
 */
function orderStatus() {
	var status = "New";
	if (requireddate) {
		if (shippeddate) {
			status = "Completed";
		} else {
			status = "Planned";
		}
	}
	return status;
}

/**
 * @properties={type:12,typeid:36,uuid:"133BACCD-11AE-486E-9EFC-94066A87FDF3"}
 */
function orderStatusStyleClass() {
	switch (orderStatus) {
	case "New Order":
		return "btn-label-info";
		break;
	case "Completed":
		return "btn-label-success";
		break;
	case "Planned":
		return "btn-label-warning";
		break;
	default:
		break;
	}
	return "btn-label-info";
}
