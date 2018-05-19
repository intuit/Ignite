import makePlugin from 'markdown-it-regexp';

const services = {
  github: (id, [file = '']) => `
    <Gist id='${id}' file='${file}' />
  `,
  youtube: id => `
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/${id}?rel=0"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    />
  `,
  twitter: id => `
    <TweetEmbed id='${id}' />
  `,
  soundcloud: id => `
    <iframe
      width="100%"
      height="300"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
    />
  `
};

export default function embed(md) {
  md.use(
    makePlugin(/{[\S ]+}\([\S]+\)/, match => {
      const [token] = match;
      const config = token.substring(
        token.indexOf('(') + 1,
        token.indexOf(')')
      );
      const service = token.substring(1, token.indexOf('}'));
      const [id, ...options] = config.split(':');

      return services[service](id, options);
    })
  );
}
