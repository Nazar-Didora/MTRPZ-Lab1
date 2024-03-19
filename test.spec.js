const {parseMarkdown} = require("./MTRPZ.js");

test('empty input', () => {
  const input = ''
  const expectedOutput = '<p></p>'

  const result = parseMarkdown(input)

  expect(result).toBe(expectedOutput)
})