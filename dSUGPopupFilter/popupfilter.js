/**
 * @private 
 * @properties={typeid:24,uuid:"26C0E710-85EA-4236-8D91-ED5017D48D4F"}
 */
function setupPopupFilter() {
	scopes.svyPopupFilter.LOCALE = {
		filterPopupMenu: {
			addFilter: 'Filter hinzufügen'
		},
		svyCheckPopupFilter : {
			labelChecked: 'Ja',
			labelUnchecked: 'Nein'
		},
		svyDatePopupFilter : {
			labelYesterday: 'Gestern',
			labelLastWeek: 'Letzte Woche',
			labelLastMonth: 'Letzter Monat',
			labelNextYear: 'Nächstes Jahr',
			labelTitle: 'Datum',
			labelToday: 'Heute',
			labelTomorrow: 'Morgen',
			labelThisWeek: 'Diese Woche',
			labelNextWeek: 'Nächste Woche',
			labelThisMonth: 'Dieser Monat',
			labelNextMonth: 'Nächster Monat',
			labelThisYear: 'Dieses Jahr',
			labelLastYear: 'Letztes Jahr',
			operator: {
				EQUALS: 'Genaues Datum',
				GREATER_EQUAL: 'Nach',
				SMALLER_EQUAL: 'Vor',
				BETWEEN: 'Zwischen'
			}
		},
		svyTokenPopupFilter : {
			searchbox: {placeholderText: 'Filter-Wert eingeben...'},
			labelRemoveAll: 'Alle entfernen'
		},
		svySelectPopupFilter : {
			searchText: { placeholderText: 'Suchen...' },
			labelSelectAll: 'Alle auswählen',
			labelDeselectAll: 'Alle entfernen',
			titleText: 'Wert'
		},
		svyIntegerPopupFilter : {
			labelTitle: 'Filter-Wert eingeben...',
			labelEqualTo: 'Genau',
			labelGreater: 'Größer als',
			labelSmaller: 'Kleiner als',
			labelBetween: 'Zwischen'
		},
		svyNumberPopupFilter : {
			labelTitle: 'Filter-Wert eingeben...',
			labelEqualTo: 'Genau',
			labelGreater: 'Größer als',
			labelSmaller: 'Kleiner als',
			labelBetween: 'Zwischen'
		}
	};
	scopes.svyToolbarFilter.setPopupRendererForm(scopes.svyToolbarFilter.FILTER_TYPES.SELECT, forms.dsugPopupFilterSelect);
	scopes.svyToolbarFilter.setPopupRendererForm(scopes.svyToolbarFilter.FILTER_TYPES.DATE, forms.dsugPopupFilterDate);
	scopes.svyToolbarFilter.setPopupRendererForm(scopes.svyToolbarFilter.FILTER_TYPES.NUMBER, forms.dsugPopupFilterNumber);
	scopes.svyToolbarFilter.setPopupRendererForm(scopes.svyToolbarFilter.FILTER_TYPES.TOKEN, forms.dsugPopupFilterToken);
	scopes.svyToolbarFilter.setPopupDefaultOperator(scopes.svyToolbarFilter.FILTER_TYPES.TOKEN, scopes.svyPopupFilter.OPERATOR.LIKE_CONTAINS);
}