import { Encrypt, Decrypt } from './encrypt-decrypt';  // Import encryption functions

export default function handler(req, res) {
    const { uid, method } = req.query;

    if (!uid || !method) {
        return res.status(400).json({ error: "Both 'uid' and 'method' parameters are required" });
    }

    let result;

    // Handle encryption or decryption based on the method
    if (method === "DECRYPT_ID") {
        result = Decrypt(uid);
    } else if (method === "ENCRYPT_ID") {
        result = Encrypt(uid);
    } else {
        return res.status(400).json({ error: "Invalid 'method'. Use 'ENCRYPT_ID' or 'DECRYPT_ID'." });
    }

    // Return the result
    res.status(200).json({ result });
}
