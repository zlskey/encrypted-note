const path = require(`path`)

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@commons': path.resolve(__dirname, 'src/commons'),
            '@contexts': path.resolve(__dirname, 'src/contexts'),
            '@helpers': path.resolve(__dirname, 'src/helpers'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
        },
    },
}
