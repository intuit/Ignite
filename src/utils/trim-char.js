export default function trimChar(str, char) {
  if (char === ']') char = '\\]';
  if (char === '\\') char = '\\\\';
  return str.replace(new RegExp('^[' + char + ']+|[' + char + ']+$', 'g'), '');
}
