import sizeOf from 'image-size';

function splice(str, start, newSubStr) {
  return str.slice(0, start) + newSubStr + str.slice(start);
}

export default function(contentBuffer) {
  const size = sizeOf(this.resourcePath);
  let content = contentBuffer.toString('utf8');

  content = splice(
    content,
    content.indexOf('};') - 1,
    `, "height": ${size.height}`
  );
  content = splice(
    content,
    content.indexOf('};') - 1,
    `, "width": ${size.width}`
  );

  return content;
}
