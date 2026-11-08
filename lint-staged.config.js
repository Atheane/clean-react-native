module.exports = {
  'apps/bank-app/**/*.{ts,tsx}': (files) => {
    return `nx affected --target=typecheck --files=${files.join(',')}`;
  },
  'apps/energy-app/**/*.{ts,tsx}': (files) => {
    return `nx affected --target=typecheck --files=${files.join(',')}`;
  },
  '{libs,tools}/**/*.{ts,tsx}': (files) => {
    return `nx affected --target=typecheck --files=${files.join(',')}`;
  },
  // Même chose pour eslint
  'apps/bank-app/**/*.{js,ts,jsx,tsx}': (files) => {
    return `eslint ${files.join(' ')} --fix`;
  },
  'apps/energy-app/**/*.{js,ts,jsx,tsx}': (files) => {
    return `eslint ${files.join(' ')} --fix`;
  },
  '{libs,tools}/**/*.{js,ts,jsx,tsx}': (files) => {
    return `eslint ${files.join(' ')} --fix`;
  },
};
