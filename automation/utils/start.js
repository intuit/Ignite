import ignite from '../../src/ignite';

const startIgnite = async example => {
  const docs = await ignite({
    src: example,
    open: false,
    watch: true
  });

  await new Promise(resolve => {
    docs.on('build-finished', resolve);
  });

  return docs;
};

export default startIgnite;
