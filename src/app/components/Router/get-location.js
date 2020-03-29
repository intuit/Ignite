const getLocation = Location => ({
  href: Location.href,
  pathname: Location.pathname,
  hash: Location.hash,
  search: Location.search
});

export default getLocation;
