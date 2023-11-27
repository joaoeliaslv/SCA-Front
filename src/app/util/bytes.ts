export function base64ToArrayBuffer(base64: string): ArrayBufferLike
{
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function isPdf(file: string): boolean
{
  if (!file)
  {
    return false;
  }
  const ass = new Uint8Array(base64ToArrayBuffer(file).slice(0, 4));
  return ass.toString() === '37,80,68,70';
}
