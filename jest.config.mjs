export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules'],
    collectCoverage: true,
    collectCoverageFrom: [
    'src/**/*.ts(x)?', 
    '!src/hooks/**', 
    '!src/features/**', 
    '!src/pages/**', 
    '!src/store/**', 
     '!src/App.tsx', 
     '!src/main.tsx', 
     '!src/vite-env.d.ts', 
     '!src/**/*.spec.ts'
    ],
    modulePaths: ['<rootDir>/src/'],
    setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'], 
    transform: {
     '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
       '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js'
    },
    testPathIgnorePatterns: ['/node_modules/', '\\.spec\\.ts$']
  };