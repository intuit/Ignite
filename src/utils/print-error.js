import pretty from 'pretty-exceptions/lib';

const printError = error => {
  if (typeof error === 'string') {
    error = new Error(error);
    const [start, , ...rest] = error.stack.split('\n');
    error.stack = [start, ...rest].join('\n');
  }

  console.error(pretty(error, { color: true, source: true }));
};

export default printError;
