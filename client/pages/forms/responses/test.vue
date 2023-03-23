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
      var response = "ZlHv9VPlJW4HaWs7ZuKPtyecLPb2Eq/S6KpFafhbzJ7gizTNc5XnK7GwsXjGSHXLQJ2dwF62NB/OZGFGVsl1RpvyjObLxKLXkYZwqYTdfKvxBAN21qBoRaoaiVyCA1SwKTEF3ImwPNrCP4DVLZs9MJJfvspJORNf/bLmVMwuWk65d43TSHIol5pfGAq8cDc+dLmFx4bTpPSNWDD+rXm5ypCMmYJvnKmqgouv0w9bWNUNi2koWgBYjLorUnC7Yj+vxT1nwhVwLf354ogWIIe+gw5a3/LfXET6xKi5w/pkzv8Sl3sO2+1pJt6h1/BhqBEhc+SAmpdxcCl05pnZ0Yi7SlGCDcNNtJLdcgwT3vf8w60zLbX1UfTd954469W3NUkY+a6iGFqiyQ2V6R/JC2mTXMIPb5iXdJ2Lrc9Gbisutt49y4ECCDh2sHZ3GeVIN0zgd7CntGXlWvg8BcjX7qRqictOIi6ptHzkObZtpeY5CE6kdqgQX++VTp+IT1nmC+Pw756T1+fkKiNM5PLibz8fSyZWb2XIDy4QnJng7mfl/GhCGPYxWACSXWHlG7Ut8LaoMEWg/rtIRkoyJ+/lVA+y/QOsmAyZt/jKHnNSHpQG4xmYUdxFuDZBdKulEV1N7VZF9S46tmWbTxMTVeicfPvSXUxvMdr3jGzdE6B3RclKR22rJLJYy+GInN+8TZetMXYhtdqBV6trTtdYkDKfrQ0WbbX9FiXEj79pvx+MDjHoPAz7NO/KWaAfz1v+OLUd58CEXwhDYBwFZq0v9fnELV06k283CrZDJlF2sZ+vtnsuc2ERTvcqjJdJ1jA8WcmDlne20zMPgKAVB7AqhTD7DtuVqPbOwCblspiJt22kep02xNaZd7CNCTM64ctmusf1KXfIm8wMOoF6NKpWK+aqRRDNEkdqWVgIONEBB/DWQSEV+YPCdj7vDZGSKeST+iOp4uMH9+nTx9wSmRv4L7jVoiYWDMn3G8DOVmv4/+9okkhau2vnwAb/H7RmBi+jPLm0llSF+CBusy/vdd3hgTXZW9DsH1msH3knw2TKlsUMsFp7RSl7PK9GgoBSjUF4gFAgKm+JfmOIPkR82oyJJ7PEwhlA7gv2i+OENRTY9ZV3NlQn8PBQbvyHqQ=="
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
