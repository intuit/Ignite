const getLocation = Location => ({
  href: Location.href,
  pathname: Location.pathname,
  hash: Location.hash,
  query: Location.query
});

export default getLocation;
