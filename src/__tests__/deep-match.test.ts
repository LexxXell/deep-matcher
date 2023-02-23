import deepMatch from '../deep-match';

test('DeepMatch test 0', () => {
  expect(deepMatch([], [])).toStrictEqual([]);
});

test('DeepMatch test 0.1', () => {
  expect(deepMatch([], {})).toStrictEqual([]);
});

test('DeepMatch test 1', () => {
  expect(deepMatch({}, {})).toStrictEqual([]);
});

test('DeepMatch test 1.1', () => {
  expect(deepMatch({}, [])).toStrictEqual([]);
});

test('DeepMatch test 2', () => {
  expect(deepMatch([1], [1])).toStrictEqual([]);
});

test('DeepMatch test 3', () => {
  expect(deepMatch({ a: 1 }, { a: 1 })).toStrictEqual([]);
});

test('DeepMatch test 4', () => {
  expect(deepMatch([1], [2])).toStrictEqual([{ key: '0', diff: [1, 2] }]);
});

test('DeepMatch test 4.1', () => {
  expect(deepMatch([], [1])).toStrictEqual([{ key: '0', diff: ['$$undefined$$', 1] }]);
});

test('DeepMatch test 4.2', () => {
  expect(deepMatch([1], [])).toStrictEqual([{ key: '0', diff: [1, '$$undefined$$'] }]);
});

test('DeepMatch test 5', () => {
  expect(deepMatch({ a: 1 }, { a: 2 })).toStrictEqual([{ key: 'a', diff: [1, 2] }]);
});

test('DeepMatch test 5.1', () => {
  expect(deepMatch({ a: 1 }, {})).toStrictEqual([{ key: 'a', diff: [1, '$$undefined$$'] }]);
});

test('DeepMatch test 5.2', () => {
  expect(deepMatch({}, { a: 1 })).toStrictEqual([{ key: 'a', diff: ['$$undefined$$', 1] }]);
});

test('DeepMatch test 6', () => {
  expect(deepMatch([{ a: 1, b: 2 }, [1, 2]], [{ a: 2, b: 1 }, [2, 1]])).toStrictEqual([
    {
      key: '0',
      diff: [
        { key: 'a', diff: [1, 2] },
        { key: 'b', diff: [2, 1] },
      ],
    },
    {
      key: '1',
      diff: [
        { key: '0', diff: [1, 2] },
        { key: '1', diff: [2, 1] },
      ],
    },
  ]);
});
