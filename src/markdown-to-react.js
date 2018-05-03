import path from 'path';
import { getOptions } from 'loader-utils';

export default function(source) {
  const options = getOptions(this);
  const ignite = `${__dirname}/index.js`;
  const parentDir = path.dirname(this.resourcePath);
  const pathToMarkdown = path.relative(options.src, this.resourcePath);

  return `
    import ignite from '${path.relative(parentDir, ignite)}';

    const markDownPage = () => (
      <div>
        ${source}
      </div>
    );
    
    export default ignite('${pathToMarkdown}', markDownPage);
  `;
}
