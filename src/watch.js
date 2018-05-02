import log from 'log-update';
import serve from 'serve';
import watch from 'watch';
import build from './ignite';

let server;

function startServer(dist, port) {
  server = serve(dist, {
    silent: true,
    port,
    ignore: ['node_modules']
  });
}

export default async function watchDocs(argv) {
  const { src, dst, port } = argv;

  startServer(dst, port);

  watch.watchTree(src, async () => {
    log('Building docs...');

    server.stop();
    await build(argv);
    startServer(dst, port);

    log(`
      Serving docs at:

        Local:   http://localhost:${port}
        Network: http://192.168.1.14:${port}
    `);
  });
}
