import serve from 'serve';
import watch from 'watch';
import build from './ignite';

let server;

function startServer(dist) {
  server = serve(dist, {
    port: 1337,
    ignore: ['node_modules']
  });
}

export default async function watchDocs(argv) {
  const { src, dist } = argv;

  startServer(dist);

  watch.watchTree(src, async () => {
    console.log('Building docs...');
    server.stop();
    await build(argv);
    startServer();
  });
}
