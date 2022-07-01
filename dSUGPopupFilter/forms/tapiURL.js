
/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"DF62C2B7-1917-4F6A-9AE0-230DF107971B"}
 */
function onAction_Telefon(event) {
	if (scopes.tapiURL.telefonNummer) {
		scopes.tapiURL.callNumber(scopes.tapiURL.telefonNummer)
	}
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"976C30CE-3F9A-4948-ADE8-324EB799B9BA"}
 */
function onAction_URL(event) {
	if (scopes.tapiURL.urlAufruf) {
		scopes.tapiURL.openURLinBrowser(scopes.tapiURL.urlAufruf)
	}
}
