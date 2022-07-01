/**
 * @type {Array<String>}
 *
 * @properties={typeid:35,uuid:"958F7BB5-734F-4470-9962-6E11352A8363",variableType:-4}
 */
var displayValues;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"BC388C1F-CE15-4A59-9D4D-2CC299232FC8"}
 */
var displayValuesSeparator;

/**
 * @param {JSRecord} record
 * @override
 *
 * @properties={typeid:24,uuid:"8B402BD1-C4B1-445E-B7B1-482EF535C7DB"}
 */
function onRecordSelected(record) {
	var entry = elements.listcomponent.newEntry();
	if (displayValues && displayValues.length) {
		if (record['displayvalue']) {
			entry.value = record['displayvalue'];
		} else {
			var textToShow = [];
			for (var i = 0; i < displayValues.length; i++) {
				textToShow.push(record[displayValues[i]]);
			}
			entry.value = textToShow.join(displayValuesSeparator);
		}
		entry.id = record.getPKs()[0];
	} else {
		var displayField = lookup.getParams() && lookup.getParams()[0] && lookup.getParams()[0].displayField ? lookup.getParams()[0].displayField : null;
		if (displayField) {
			entry.value = record[displayField];
		}
		entry.id = record.getPKs()[0];
	}
}

/**
 * @param {JSRecord} record
 * @override
 *
 * @properties={typeid:24,uuid:"690ECC9C-4466-40BC-9C12-F48BB6309EAC"}
 */
function onRecordDeselected(record) {
	for (var i = 0; i < elements.listcomponent.getEntriesCount(); i++) {
		var entry = elements.listcomponent.getEntry(i);
		if (scopes.svyJSUtils.arePKsEqual([entry['id']], record.getPKs())) {
			elements.listcomponent.removeEntry(i);
			break;
		}
	}
}

/**
 * Called when the mouse is clicked on a list entry.
 *
 * @param {object} entry
 * @param {Number} index
 * @param {string} dataTarget
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F261BF81-4C8C-4E63-823C-068FE01243FA"}
 */
function onClick(entry, index, dataTarget, event) {
	if (dataTarget === 'remove-entry') {
		deselectPks([entry['id']]);
	}
}

/**
 * @param {Array<*>} pks
 * @override
 *
 * @properties={typeid:24,uuid:"B1F1A954-6ABD-4448-B5DB-18E36ED7D4EA"}
 */
function deselectPks(pks) {
	var selectedRecords = lookup.getSelectedRecords();
	for (var i = 0; i < selectedRecords.length; i++) {
		if (scopes.svyJSUtils.arePKsEqual(selectedRecords[i].getPKs(), pks)) {
			deselectRecord(selectedRecords[i]);
		}
	}
}

/**
 * @param {Boolean} firstShow
 * @param {JSEvent} event
 * @override
 *
 * @properties={typeid:24,uuid:"38C08670-DBA0-4F67-9B82-650840450535"}
 */
function onShow(firstShow, event) {
	if (firstShow) {
		var valueListName = lookup.getValueListName();
		if (valueListName) {
			var jsValueList = solutionModel.getValueList(valueListName);
			if (jsValueList) {
				displayValues = jsValueList.getDisplayDataProviderIds();
				displayValuesSeparator = jsValueList.separator;
				
				if (!displayValues || !displayValues.length) {
					displayValues = ['displayvalue'];
				}
			}
		}
	}
	_super.onShow(firstShow, event);
}
