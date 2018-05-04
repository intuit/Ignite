import path from 'path';
import { getOptions } from 'loader-utils';

function insertInString(a, b, position) {
  return a.substr(0, position) + b + a.substr(position);
}

function injectPreTemplate(source) {
  let codeTag = source.indexOf('<code')

  if (codeTag === -1) {
    return source;
  }

  let count = 4
  while(count--) {
    const endCodeBracket = source.indexOf('>', codeTag)
    source = insertInString(source, '{`', endCodeBracket + 1)
  
    const endCodeTag = source.indexOf('</code>')
    source = insertInString(source, '`}', endCodeTag - 1)
    console.log(source)

    codeTag = source.indexOf('<code', endCodeTag)
  }


  return source;
}

export default function(source) {
  const options = getOptions(this);
  const pathToMarkdown = path.relative(options.src, this.resourcePath);
  const isIndex = this.resourcePath.includes(path.join(options.src, options.index));

  return `
    import ignite from 'ignite';

    function markDownPage() {
      return <div>
        ${injectPreTemplate(source)}
      </div>
    };
    
    export default ignite('${pathToMarkdown}', markDownPage, ${isIndex});
  `;
}
