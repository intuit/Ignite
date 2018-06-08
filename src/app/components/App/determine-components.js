import path from 'path';
import trimChar from '../../../utils/trim-char';

const getParent = (markdown, navItems, filePath) =>
  markdown.indexFiles &&
  Object.entries(markdown.indexFiles).find(([key]) => {
    const currentDir = filePath.includes('.md')
      ? path.dirname(filePath)
      : filePath;

    return (
      Object.values(navItems).includes(path.dirname(key)) &&
      trimChar(path.dirname(key), '/') === trimChar(currentDir, '/')
    );
  });

export const determineSidebar = (
  markdown,
  location,
  indexFile,
  navItems = process.env.navItems
) => {
  const filePath = location.pathname.replace('.html', '.md');
  const index = path.join(process.env.baseURL, indexFile);

  let SidebarComponent = markdown[index];
  let currentFirstPage = markdown.indexFiles[index];

  if (navItems) {
    const [parentIndex, parentPageFirstPage] =
      getParent(markdown, navItems, filePath) || [];

    if (parentIndex && parentPageFirstPage) {
      SidebarComponent = markdown[parentIndex];
      currentFirstPage = parentPageFirstPage;
    }

    if (!SidebarComponent && markdown.indexFiles) {
      const rootIndex = path.join(navItems.root, indexFile);
      SidebarComponent = markdown[rootIndex];
      currentFirstPage = markdown.indexFiles[rootIndex];
    }
  }

  window.configuration.currentFirstPage = currentFirstPage;

  return SidebarComponent;
};

export const determinePage = (
  markdown,
  location,
  indexFile,
  navItems = process.env.navItems
) => {
  const filePath = location.pathname.replace('.html', '.md');

  if (filePath.includes('blog/')) {
    return markdown[filePath];
  }

  let Page = markdown[filePath];

  if (navItems) {
    const [, parentPageFirstPage] =
      getParent(markdown, navItems, filePath) || [];

    if (parentPageFirstPage && (!Page || filePath.includes(indexFile))) {
      Page = markdown[parentPageFirstPage];
    }

    if (!Page && markdown.indexFiles) {
      const rootIndex = path.join(navItems.root, indexFile);
      Page = markdown[markdown.indexFiles[rootIndex]];
    }
  }

  const index = path.join(process.env.baseURL, indexFile);

  if ((!Page || index === filePath) && markdown.indexFiles) {
    Page = markdown[markdown.indexFiles[index]];
  }

  return Page ? Page : () => null;
};
