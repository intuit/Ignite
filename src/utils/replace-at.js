export default function replaceAt(input, search, replace, start) {
  return (
    input.slice(0, start) +
    input.slice(start, start + search.length).replace(search, replace) +
    input.slice(start + search.length)
  );
}
