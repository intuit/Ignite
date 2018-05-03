export default function(source) {
  if (!global.docs) {
    global.docs = [];
  }

  global.docs.push(this.resourcePath);

  return `export default () => (
    <div>
      ${source}
    </div>
  )`;
}
