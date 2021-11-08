const postcss = require('postcss');
const tailwind = require('tailwindcss');

module.exports = async function(content) {
  const input = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `;

  const config = {
    purge: {
      enabled: true,
      content: [{ raw: content }],
    }
  };

  const res = await postcss(tailwind(config)).process(input);
  return res.css;
}