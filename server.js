var url = require("url"),
	http = require("http"),
	fs = require("fs");
	
function gotoFind(req, res) {
	var reqsite = url.parse(req.url).pathname,
		resurl = __dirname + "/" + reqsite,
		resfile = fs.readFileSync(resurl, 'binary'),
		resurldot = reqsite.lastIndexOf("."),
		resType = reqsite.substr(resurldot),
		flType;
	switch (resType) {
		case '.css': flType = 'text/css'; break;
		case '.js': flType = 'text/javascript';break;
		case '.png': flType = "image/png"; break;
		case '.jpg': flType = "image/jpg"; break;
        case '.json': flType = "application/json"; break;
		case '.html': 
		case '.htm': flType = "text/html";break;
		default: console.log(resType);flType = "text/html";break;
	}
	fs.exists(resurl, function (exist) {
		if (exist) {
			res.writeHead(200, {'Content-Type': flType});
			res.write(resfile, 'binary');
			res.end();
		} else {
			console.log(resurl + "is not exist");
			res.writeHead(404, {'Content-Type': 'tet/plain'});
			res.end();
		}
	});
}
	
	
http.createServer(function (req, res) {
	var requrl = url.parse(req.url).pathname;
	if (requrl == "/favicon.ico") {
		return;
	} else {
		if (requrl == "/") {
			var indexurl = __dirname + "/index.html",
				indexfile = fs.readFileSync(indexurl, 'binary');
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(indexfile, 'binary');
			res.end();
		} else {
			gotoFind(req, res);
		}
	}
}).listen(3000,'127.0.0.1');
console.log("run at 127.0.0.1:3000");