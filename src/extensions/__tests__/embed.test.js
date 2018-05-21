import MarkdownIt from 'markdown-it';
import embed from '../embed';

const md = new MarkdownIt().use(embed);

test('embed - gist', () => {
  expect(md.render(`{github}(6590929)`)).toMatchSnapshot();
  expect(md.render(`{github}(6590929:d3.js)`)).toMatchSnapshot();
});

test('embed - youtube', () => {
  expect(md.render(`{youtube}(5Gi1djkgB5k)`)).toMatchSnapshot();
});

test('embed - twitter', () => {
  expect(md.render(`{twitter}(989197113648037888)`)).toMatchSnapshot();
});

test('embed - soundcloud', () => {
  expect(md.render(`{soundcloud}(386355071)`)).toMatchSnapshot();
});
