import { getOptions } from 'loader-utils';
import markdownRenderer from 'markdown-it';

export default function(source) {
  const options = getOptions(this);
  return markdownRenderer(options).render(source);
}
