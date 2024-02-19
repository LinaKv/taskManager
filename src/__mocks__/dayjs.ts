const mock = jest.genMockFromModule('dayjs');

const dayjs = jest.requireActual('dayjs');
const isBetween = jest.requireActual('dayjs/plugin/isBetween');

dayjs.extend(isBetween);

// @ts-expect-error - jest mock
mock.isBetween = jest.fn().mockReturnValue(dayjs.isBetween('2010-10-19', '2024-10-20'));

module.exports = mock;
