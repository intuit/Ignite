import fs from 'fs';
import probe from 'probe-image-size';

function splice(str, start, newSubStr) {
  return str.slice(0, start) + newSubStr + str.slice(start);
}

export default function(contentBuffer) {
  const data = fs.readFileSync(this.resourcePath);
  const size = probe.sync(data);

  let content = contentBuffer.toString('utf8');

  if (content.includes('= {')) {
    content = splice(
      content,
      content.indexOf('};') - 1,
      `, height: ${size.height}`
    );
    content = splice(
      content,
      content.indexOf('};') - 1,
      `, width: ${size.width}`
    );
  } else {
    const src = content.substring(
      content.indexOf('= ') + 1,
      content.indexOf(';')
    );

    content = `
      module.exports = {
        src: ${src},
        height: ${size.height},
        width: ${size.width}
      }
    `;
  }

  return content;
}
