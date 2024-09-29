const express = require('express');
const app = express();

function encrypt(number) {
    number = parseInt(number);
    let encodedBytes = [];
    while (true) {
        let byte = number & 0x7F;
        number >>= 7;
        if (number) byte |= 0x80;
        encodedBytes.push(byte);
        if (!number) break;
    }
    return Buffer.from(encodedBytes).toString('hex');
}

function decrypt(encodedHex) {
    let encodedBytes = Buffer.from(encodedHex, 'hex');
    let number = 0, shift = 0;
    for (let byte of encodedBytes) {
        let value = byte & 0x7F;
        number |= value << shift;
        shift += 7;
        if (!(byte & 0x80)) break;
    }
    return number;
}

app.get('/api', (req, res) => {
    const uid = req.query.uid;
    const method = req.query.method;
    if (method === 'DECRYPT_ID') {
        res.send(decrypt(uid).toString());
    } else if (method === 'ENCRYPT_ID') {
        res.send(encrypt(uid));
    } else {
        res.send('Invalid method');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
