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
  `,
  codepen: (username, penId) => `
  <iframe 
    width="100%"
    height="500"
    src="//codepen.io/${username}/embed/${penId}/"
    frameborder="no"
    allowfullscreen  
  />
  `
};

export default function embed(md) {
  md.use(
    makePlugin(/\[([\S ]+)\|([\S]+)\]/, match => {
      const [, service, rawOptions] = match;
      const [id, ...options] = rawOptions.split(':');

      return services[service](id, options);
    })
  );
}
