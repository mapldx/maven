<script setup>
import { ref } from 'vue';

const decryptionKey = ref(null);
const decryptedData = ref('');

// Function to handle file upload
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const pemString = reader.result.toString();
      const pemArray = pemString.split('\n').filter(line => line.trim() !== '');
      const pem = pemArray.slice(1, pemArray.length - 1).join('');
      const pemBuffer = new Uint8Array(atob(pem).split('').map(char => char.charCodeAt(0)));
      
      let privateKey;
      try {
        privateKey = await window.crypto.subtle.importKey(
          "pkcs8",
          pemBuffer,
          {
            name: "RSA-OAEP",
            hash: { name: "SHA-256" },
          },
          true,
          ["decrypt"]
        );
      } catch (error) {
        console.error("Failed to import private key:", error);
      }
      var response = "/EpkVgNzWFCTqQlJNRplcb2vtPuMYLYDFuoMt64CzdBQq3hPKSlYiyL8KQTw0Q/PTt6KRG4C5sV4lzojpujTlr8UkWoxZ4jx+6hLaLypgPVHNPDWPixYDeDYr70zrAaWKVQOd+xgklONsKCESrlN23kljFPgOunTKRW5CDNQDYOwTZLQctG6V9mTluHLiMK69iZwfHwFrGxeI0xvzQ7yOd7b4aPZqxImUfjOEG65LPPYlLJ82fC741xfoPAPkOZ+gCTGqOoCQGc0uPAqAJtO3kHyEmuvBdU1lPscvW1uoNO5OC6a8DFppjIY3KFVwqNjYmfUWgi6s1v1FT3019GurajnMd8u3bM82E9J2mLS6R/MaTbv7VpF/osod4CHqp5sMEP7vUX4n8mEBXqpfIiqwP9/dJYrBVN8g51+Uf+SHyl8RmMkkLC+nWTDYaOpDyvzSA1ikFN+sBlqPrPNotaTVG6fBg5WcK5d+/1v2HhaChWrFcGQcy5glqe887m+sTTt2PtIex4WFQBElojJwWEHmqBgXmukgigowjrqg2vUKnUhg0wgIPos36/AXU4/XdqNMwjykg=="
      const ciphertext = atob(response)
      const ciphertextBuffer = new Uint8Array(ciphertext.split('').map(char => char.charCodeAt(0)));
      const iv = ciphertextBuffer.subarray(0, 12);
      const encryptedKey = ciphertextBuffer.subarray(iv.length, iv.length + 256);
      const encryptedData = ciphertextBuffer.subarray(encryptedKey.length);
      const decryptedSymmetricKey = await window.crypto.subtle.decrypt(
        {
          name: "RSA-OAEP",
        },
        privateKey,
        encryptedKey
      );
      const jwkSymmetricKey = JSON.parse(
        new TextDecoder().decode(decryptedSymmetricKey)
      );
      decryptedData.value = jwkSymmetricKey
      const symmetricKey = await window.crypto.subtle.importKey(
        "jwk",
        jwkSymmetricKey,
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
      console.log(symmetricKey)
      console.log(iv)
      const encrypted = encryptedData.slice(12);
      const decryptedCiphertext = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv,
        },
        symmetricKey,
        encrypted
      );
      const decrypted = new TextDecoder().decode(decryptedCiphertext);
      decryptedData.value = decrypted;
    } catch (Exception) {
      console.error(Exception);
    }
  };
  reader.readAsText(file);
}
</script>

<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <p>Decrypted data: {{ decryptedData }}</p>
  </div>
</template>
