export function Encrypt(number) {
    number = parseInt(number);
    const encodedBytes = [];
    while (true) {
        let byte = number & 0x7F;
        number >>= 7;
        if (number) byte |= 0x80;
        encodedBytes.push(byte);
        if (!number) break;
    }
    return Buffer.from(encodedBytes).toString('hex');
}

export function Decrypt(encodedBytes) {
    encodedBytes = Buffer.from(encodedBytes, 'hex');
    let number = 0, shift = 0;
    for (const byte of encodedBytes) {
        const value = byte & 0x7F;
        number |= value << shift;
        shift += 7;
        if (!(byte & 0x80)) break;
    }
    return number;
}
