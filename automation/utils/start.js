import ignite from '../../src/ignite';

const startIgnite = async (port, example, options = {}) => {
  const docs = await ignite({
    port,
    src: example,
    open: false,
    watch: true,
    log: false,
    ...options
  });

  await new Promise(resolve => {
    docs.on('build-finished', resolve);
  });

  return docs;
};

export default startIgnite;
