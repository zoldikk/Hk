export function Decrypt(encodedBytes) {
    encodedBytes = Buffer.from(encodedBytes, 'hex');
    let number = 0, shift = 0;
    for (const byte of encodedBytes) {
        const value = byte & 0x7F;
        number |= value << shift;
        shift += 7;
        if (!(byte & 0x80)) break;
    }
    return number >>> 0;  // Ensures the result is always a positive number
}
