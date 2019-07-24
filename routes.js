const fs = require('fs');

const requestHandle = (req, res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        res.write('<html><head><title>aaaaaaaaaa</title></head>');
        res.write('<body><h1>12131</h1><form action="/message" method="post"><input type="text" name="message"><button type="submit">Submit</button></form></body></html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/message');
        return res.end();
    }
    res.write('<html><head><title>aaaaaaaaaa</title></head>');
    const a = [];
    a.push(fs.readFileSync('message.txt'));
    const parsedBody1 = Buffer.concat(a).toString();
    res.write('<body><h1>'+parsedBody1+'</h1>');
    res.write('<a href="/">back</a></body></html>')
    res.end();
}

module.exports = requestHandle;