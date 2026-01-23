export function validateFormat(str) {
  // Check if str is a string
  if (typeof str !== "string") {
    return false;
  }
  const pattern = /^\d{2}-\d{4}-\d{3}$/;

  return pattern.test(str);
}
