/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8B93F0AD-F26F-45C7-96E2-A4C5AF36A3B8"}
 */
var telefonNummer = '';
	

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"ACC66D62-B8F3-4E1B-BDF3-FAA337AE9915"}
 */
var urlAufruf = '';

/**
 * @param {String} number
 *
 * @properties={typeid:24,uuid:"DAD94042-9A9F-47DF-9132-9D14E6F91DEE"}
 */
function callNumber(number) {
	var url = 'tel:' + cleanPhoneNumber(number);
	openExternalURL(url);
}

/**
 * cleans a given string and formats it for http://
 * @param {String} url
 * @return {String}
 * @properties={typeid:24,uuid:"D83E80F3-F18E-41E8-BF12-56D28A9C0DAD"}
 */
function cleanHTTP(url) {
	if (!url.startsWith('http://') && !url.startsWith('https://')) {
		url = 'http://' + url;
	}
	return url
}

/**
 * cleans up a given phone-number to call.
 * removes ()-/\ 
 * @param {String} number
 * @return {String}
 * @properties={typeid:24,uuid:"1B1F4D15-2175-4C0A-B763-1569A6DF268B"}
 */
function cleanPhoneNumber(number) {
	number = number.replace(/\(/g,'');
	number = number.replace(/\)/g,'');
	number = number.replace(/\-/g,'');
	number = number.replace(/\//g,'');
	number = number.replace(/\\/g,'');
	number = number.replace(/\*/g,'');
	number = number.replace(/\ /g,'');
	return number;
}

/**
 * Opens a URL in Default Browser
 * @param {String} url
 *
 * @properties={typeid:24,uuid:"A0295196-A340-483F-8314-3EE497B0C5DB"}
 */
function openURLinBrowser(url) {
	if (url) {
		openExternalURL(cleanHTTP(url.toLowerCase()));
	}
}

/**
 * Opens a link in the default browser instead of the ngDesktop
 * @param {String} url URL to open in the default Browser
 *
 * @properties={typeid:24,uuid:"BFF6A97C-6393-4585-8400-8F7CFACD5A52"}
 */
function openExternalURL(url) {
	if (!url) {
		return;
	}
	if (application.getApplicationType() == APPLICATION_TYPES.NG_CLIENT && plugins['ngdesktoputils'] && plugins['ngdesktoputils'].isNGDesktop()) {
		var osName = application.getOSName();
		if (/Windows/.test(osName)) {
			plugins['ngdesktoputils'].executeCommand('rundll32', ['url.dll,FileProtocolHandler', url]);
		} else if (/Linux|Freebsd/.test(osName)) {
			plugins['ngdesktoputils'].executeCommand('mozilla', [url]);
		} else if (/Mac/.test(osName)) {
			plugins['ngdesktoputils'].executeCommand('open', [url]);
		}
	} else {
		application.showURL(url, '_blank');
	}
}