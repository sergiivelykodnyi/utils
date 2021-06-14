import { formatNumber } from "../format-number";

test("Should return integer as formatted string", () => {
  const testCases = [
    { number: 1_234, result: "1,234" },
    { number: 12_345, result: "12,345" },
    { number: 123_456, result: "123,456" },
    { number: 1_234_567, result: "1,234,567" },
    { number: 12_345_678, result: "12,345,678" },
    { number: 123_456_789, result: "123,456,789" },
    { number: 1_234_567_890, result: "1,234,567,890" },
  ];

  testCases.forEach(({ number, result }) => {
    expect(formatNumber(number)).toBe(result);
  });
});

test("Should round float to whole number and return it as formatted string", () => {
  const testCases = [
    { number: 1_234.56789789467, result: "1,235" },
    { number: 12_345.6789999358, result: "12,346" },
    { number: 123_456.789789237, result: "123,457" },
    { number: 1_234_567.8998812, result: "1,234,568" },
    { number: 12_345_678.901195, result: "12,345,679" },
    { number: 123_456_789.01234, result: "123,456,789" },
    { number: 1_234_567_890.123, result: "1,234,567,890" },
  ];

  testCases.forEach(({ number, result }) => {
    expect(formatNumber(number)).toBe(result);
  });
});

test("Should round float 2 decimal places and return as formatted string", () => {
  const testCases = [
    { number: 1_234, result: "1,234.00" },
    { number: 12_345.6, result: "12,345.60" },
    { number: 123_456.78, result: "123,456.78" },
    { number: 1_234_567.9011956, result: "1,234,567.90" },
    { number: 12_345_678.909999, result: "12,345,678.91" },
    { number: 123_456_789.01234, result: "123,456,789.01" },
    { number: 1_234_567_890.123, result: "1,234,567,890.12" },
  ];

  testCases.forEach(({ number, result }) => {
    expect(formatNumber(number, { fraction: 2 })).toBe(result);
  });
});

test("Should return float as formatted string in short format", () => {
  const testCases = [
    { number: 1_234.567891234567, result: "1.23K" },
    { number: 12_345.56789123456, result: "12.35K" },
    { number: 123_456.5678912345, result: "123.46K" },
    { number: 1_234_567.56789123, result: "1.23M" },
    { number: 12_345_678.5678912, result: "12.35M" },
    { number: 123_456_789.567891, result: "123.46M" },
    { number: 1_234_567_890.5678, result: "1.23B" },
  ];

  testCases.forEach(({ number, result }) => {
    expect(formatNumber(number, { fraction: 2, isShorten: true })).toBe(result);
  });
});

test("Should throw exception when value is not a number", () => {
  const testCases = [
    "1234.567897894",
    true,
    false,
    null,
    undefined,
    NaN,
    {},
    { a: 1 },
    [],
    [1, 2, 3, 4, 5],
  ];

  testCases.forEach((value) => {
    const attempt = () => formatNumber(value);
    const error = new Error(`Param ${value} in not a number`);
    expect(attempt).toThrow(error);
  });
});
