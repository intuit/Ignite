import yaml from 'js-yaml';
import gravatar from 'gravatar';

function parseConfig(config) {
  const { title, image, author = {} } = config;

  let name;
  let email;
  let url;

  if (typeof author === 'string') {
    name = author;
  } else {
    ({ name, url, email } = author);
  }

  return {
    title,
    image,
    name,
    url,
    email
  };
}

export default function renderBlogFrontMatter(tokens) {
  const [{ markup }] = tokens;

  // Remove container characters
  let blogConfig = markup.substring(4, markup.length - 4);

  try {
    blogConfig = yaml.safeLoad(blogConfig, 'utf8');
  } catch (e) {
    console.log(e);
  }

  let { title, image, name, url, email } = parseConfig(blogConfig);
  const profilePic = email
    ? `<img src="${gravatar.url(email)}" class="authorImage" />`
    : '';

  if (url) {
    name = `<a target="_blank" href="${url}">${name}</a>`;
  }

  return `
    <div class="media blogHeader">
      <p id="background-image">
        ${image}
      </p>
      <div class="media-content has-text-centered">
        ${profilePic}

        <p class="title blogTitle">
          ${title}
        </p>
        <p class="subtitle is-6 blogSubtitle">
          ${name}
        </p>
      </div>
    </div>
  `;
}
