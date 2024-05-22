export function isValidInteger(value: string) {
  return /^\d+$/.test(value) && !!parseInt(value);
}
