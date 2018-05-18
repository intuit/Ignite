import yaml from 'js-yaml';
import gravatar from 'gravatar';

function parseConfig(config) {
  const { title, date, image, author } = config;

  let name;
  let email;
  let link;

  if (typeof author === 'string') {
    name = author;
  } else {
    ({ name, link, email } = author);
  }

  return {
    title,
    image,
    date,
    name,
    link,
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

  let { title, image, date, name, link, email } = parseConfig(blogConfig);
  const profilePic = email
    ? `<img src="${gravatar.url(email)}" class="authorImage" />`
    : '';

  if (link) {
    name = `<a target="_blank" href="${link}">${name}</a>`;
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
          ${date ? `${name} on ${date}` : name}
        </p>
      </div>
    </div>
  `;
}
