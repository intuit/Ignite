import printError from '../print-error';

describe.skip('printError', () => {
  test('string', () => {
    const mock = jest.fn();
    console.error = mock;

    printError('An error String');

    expect(mock).toMatchSnapshot();
  });

  test('error', () => {
    const mock = jest.fn();
    console.error = mock;

    printError(new Error('An error String'));

    expect(mock).toMatchSnapshot();
  });
});
