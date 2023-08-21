
const getArrayFromBase64 = (base64: string):Uint8Array => {
  return Uint8Array.from(window.atob(base64), v => v.charCodeAt(0))
}

const getUrl = (base64: string):string => {
  return "data:application/octet-stream;base64,"+base64
}

const readFileAsText = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsText(file)
  })
}

const getBase64FromArrayBuffer = async (data:Uint8Array, fullUrl: boolean):Promise<string> => {
  // Use a FileReader to generate a base64 data URI
  const base64url: string = await new Promise((r) => {
      const reader:any = new FileReader()
      reader.onload = () => r(reader.result)
      reader.readAsDataURL(new Blob([data]))
  })

  if(fullUrl) return base64url

  return base64url.substring(base64url.indexOf(',')+1) 
}

const encodeData = async (data: any) => {
  const encoder = new TextEncoder();
  return encoder.encode(data);
}

const decodeData = async (data: any) => {
  const decoder = new TextDecoder();
  return decoder.decode(data)
}

const generateIV = async () => {
  const iv = new Uint8Array(16);
  window.crypto.getRandomValues(iv)

  return iv
}

const generateRandomPassword = () => {
  const characters = "0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
  let string = "";
  for (let i = 0; i <= 12; i++) {
    string += characters[Math.floor(Math.random() * characters.length)];
  }
  return string;
}

const generateKey = async (inputString:string) => {
  
  const encodedSecret = await encodeData(inputString)
  const digested = await window.crypto.subtle.digest("SHA-256", encodedSecret)

  return window.crypto.subtle.importKey(
    'raw',
    digested,
    { name: 'AES-CBC', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

const encryptData = async (data, iv, key) => {
  const algorithm = { name: "AES-CBC", iv: iv };
  const encryptedData = await window.crypto.subtle.encrypt(algorithm, key, data);

  // console.log('encryptedData: ', encryptedData)
  return new Uint8Array(encryptedData);
}

const decryptData = async (data, iv, key) => {
  const algorithm = { name: "AES-CBC", iv: iv };
  const decryptedData = await window.crypto.subtle.decrypt(algorithm, key, data);

  // console.log('decryptedData: ', decryptedData)
  return new Uint8Array(decryptedData);
}

const downloadBlob = (blob, filename) => {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export default {
  getArrayFromBase64,
  getUrl,
  getBase64FromArrayBuffer,
  readFileAsText,
  encodeData,
  decodeData,
  generateRandomPassword,
  generateIV,
  generateKey,
  encryptData,
  decryptData,
  downloadBlob
}
