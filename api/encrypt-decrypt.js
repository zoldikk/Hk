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

export function Encrypt(number) {
    number = parseInt(number);  // Ensure the input is an integer
    const encodedBytes = [];

    while (true) {
        let byte = number & 0x7F;  // Get the lowest 7 bits
        number >>= 7;  // Shift right by 7 bits
        if (number) {
            byte |= 0x80;  // Set the MSB to indicate more bytes follow
        }
        encodedBytes.push(byte);
        if (!number) break;  // Stop if there are no more bits
    }

    return Buffer.from(encodedBytes).toString('hex');  // Return hex string
}
