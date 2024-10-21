/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: '@ob-npm-common/jest-config',
  rootDir: 'lib',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json',
    },
  },
};
