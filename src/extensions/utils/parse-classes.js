const withOptions = /[\S]+ [\S ]+/;

export default function parseClasses(options) {
  let classList = [];

  if (options.trim().match(withOptions)) {
    const [, ...userOptions] = options.trim().split(' ');
    classList = [...userOptions];
  }

  return classList;
}
