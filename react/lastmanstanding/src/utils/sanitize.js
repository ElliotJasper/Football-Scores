export function sanitize(value) {
  const regex = /[^A-Za-z0-9@.!£$%^&*()]/gi;
  return value.replace(regex, "");
}
