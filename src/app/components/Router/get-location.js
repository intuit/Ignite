const getLocation = Location => ({
  pathname: Location.pathname,
  hash: Location.hash,
  query: Location.query
});

export default getLocation;
