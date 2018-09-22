import path from 'path';
import trimChar from '../../../utils/trim-char';

const getParent = (markdown, navItems, filePath) =>
  markdown.indexFiles &&
  Object.entries(markdown.indexFiles).find(([key]) => {
    const compare =
      path.dirname(filePath) !== '/' ? path.dirname(filePath) : filePath;
    return (
      Object.values(navItems).includes(path.dirname(key)) &&
      trimChar(path.dirname(key), '/') === trimChar(compare, '/')
    );
  });

export const determineSidebar = (
  markdown,
  location,
  indexFile,
  navItems = process.env.navItems
) => {
  const index = path.join(process.env.baseURL, indexFile).replace('.md', '');

  let SidebarComponent = markdown[index];
  let currentFirstPage = markdown.indexFiles[index];

  if (navItems) {
    const [parentIndex, parentPageFirstPage] =
      getParent(markdown, navItems, location.pathname) || [];

    if (parentIndex) {
      SidebarComponent = markdown[parentIndex];
      currentFirstPage = parentPageFirstPage;
    }

    if (!SidebarComponent && markdown.indexFiles) {
      const rootIndex = path.join(navItems.root, indexFile.replace('.md', ''));
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

  if (filePath.includes('/blog')) {
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
      const rootIndex = path.join(navItems.root, indexFile).replace('.md', '');
      Page = markdown[markdown.indexFiles[rootIndex]];
    }
  }

  const index = path.join(process.env.baseURL, indexFile).replace('.md', '');

  if ((!Page || index === filePath) && markdown.indexFiles) {
    Page = markdown[markdown.indexFiles[index]];
  }

  return Page ? Page : () => null;
};
