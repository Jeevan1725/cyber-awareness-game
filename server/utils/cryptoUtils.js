import crypto from "crypto";

const algorithm = "aes-256-cbc";
const iv = Buffer.alloc(16, 0);

export function generateKey(masterPassword){

  return crypto
    .createHash("sha256")
    .update(masterPassword)
    .digest();

}

export function encryptPassword(password, masterPassword){

  const key = generateKey(masterPassword);
2
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(password,"utf8","hex");

  encrypted += cipher.final("hex");

  return encrypted;

}

export function decryptPassword(encrypted, masterPassword){

  const key = generateKey(masterPassword);

  const decipher = crypto.createDecipheriv(algorithm,key,iv);

  let decrypted = decipher.update(encrypted,"hex","utf8");

  decrypted += decipher.final("utf8");

  return decrypted;

}