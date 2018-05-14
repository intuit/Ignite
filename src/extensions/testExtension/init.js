export default function init() {
  return {
    data: 'foo',
    nested: {
      deeply: {
        value: 'foo',
        func: () => 'deep func'
      }
    }
  };
}
