// using the expect library  from npm because Mocha doesn't have an assertion library
import expect from 'expect';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).toEqual(true);
  });
});
