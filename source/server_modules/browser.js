var os = require('os');
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var ifaces = os.networkInterfaces();

/**
 * search the correct IP address to connect a browser 
 * usefull to connect with a mobile phone to test responsive design
 * @return {string} IP address
 */
function getIP() {
	"use strict";
	var ip = '127.0.0.1';
	Object.keys(ifaces).forEach(function(ifname) {
		var alias = 0;
		// console.log(ifname);
		ifaces[ifname].forEach(function(iface) {
			['VirtualBox', 'VMware', 'vmnet'].forEach(function(ignore) {
				if (ifname.indexOf(ignore) > -1) {
					iface.internal = true;
				}
			});

			if ('IPv4' !== iface.family || iface.internal !== false) {
				// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
				return;
			}

			if (alias >= 1) {
				// this single interface has multiple ipv4 addresses
				ip = iface.address;
			} else {
				// this interface has only one ipv4 adress
				ip = iface.address;
			}
			++alias;
		});
	});
	return ip;
}

/**
 * this modules starts a browser (chrome)
 * requires environment variable CHROME
 * @return {module} exports method start
 */
module.exports = function() {
	"use strict";
	var that = {};
	var ip = getIP();
	var browserProcess = null;

	/**
	 * private function to start/spawn a new browserprocess  
	 * @param  {string} browserExe path to browser executable
	 * @param  {int} port       
	 * @return {undefined}            
	 */
	function startBrowser(browserExe, port) {
		var url = 'http://'+ip+':'+port;
		console.log("Monitor: starting", browserExe, url);
		browserProcess = spawn(browserExe, [url]);
	}

	that.start = function(port) {
		if (process.env.CHROME) {
			console.log('Chrome', process.env.CHROME);
			startBrowser(process.env.CHROME, port);
		} else {
			console.log('env CHROME is not defined');
		}
	};
	return that;
};