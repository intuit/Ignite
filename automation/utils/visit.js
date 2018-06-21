import url from 'url';
import nightmare from 'nightmare';

const BASE_URL = url.format({
  protocol: process.env.PROTOCOL || 'http',
  hostname: process.env.HOST || 'localhost',
  port: process.env.PORT || 8008
});

export default function visit(path = '') {
  const location = url.resolve(BASE_URL, path);
  return nightmare({ show: true }).goto(location);
}
