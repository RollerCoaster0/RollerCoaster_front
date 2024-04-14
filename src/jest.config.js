module.exports = {
    // среда тестирования - браузер
    testEnvironment: 'jest-environment-jsdom',
}
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    extensionsToTreatAsEsm: ['.jsx'],
    moduleDirectories: ['node_modules', 'testing'],
    // !
    transform: {
        // дефолтное значение, в случае кастомизации должно быть указано явно
        '\\.[jt]sx?$': 'babel-jest',
        // трансформация файлов
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/testing/file-transformer.js'
    }
}
