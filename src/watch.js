import log from 'log-update';
import serve from 'serve';
import watch from 'watch';
import build from './ignite';

const PORT = 8008;
let server;

function startServer(dist) {
  server = serve(dist, {
    silent: true,
    port: PORT,
    ignore: ['node_modules']
  });
}

export default async function watchDocs(argv) {
  const { src, dst } = argv;

  startServer(dst);

  watch.watchTree(src, async () => {
    log('Building docs...');
    server.stop();
    await build(argv);
    log(`
      Serving docs at:

        Local:   http://localhost:${PORT}
        Network: http://192.168.1.14:${PORT}
    `);
    startServer(dst);
  });
}
