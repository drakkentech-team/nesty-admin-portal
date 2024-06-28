/** @type {import('vue-jest')} */
module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        // tell Jest to handle `*.vue` files
        'vue'
    ],
    transform: {
        // process `*.vue` files with `vue-jest`
        '.*\\.(vue)$': '@vue/vue3-jest',
        // process js with `babel-jest`
        '.*\\.(js)$': 'babel-jest'
    },
    coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
    coverageReporters: ["text", "json-summary"],
    // support the same @ -> src alias mapping in source code
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    // serializer for snapshots
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    testMatch: [
        // match test files
        '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],
    // setup test environment
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },


};
