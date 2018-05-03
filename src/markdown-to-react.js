import path from 'path';
import { getOptions } from 'loader-utils';

export default function(source) {
  const options = getOptions(this);
  const pathToMarkdown = path.relative(options.src, this.resourcePath);
  const isIndex = this.resourcePath.includes(`${options.src}/${options.index}`);

  return `
    import ignite from 'ignite';

    const markDownPage = () => (
      <div>
        ${source}
      </div>
    );
    
    export default ignite('${pathToMarkdown}', markDownPage, ${isIndex});
  `;
}
