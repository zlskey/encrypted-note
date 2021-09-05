const path = require(`path`);

module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@contexts': path.resolve(__dirname, 'src/contexts'),
            '@helpers': path.resolve(__dirname, 'src/helpers'),
            '@pages': path.resolve(__dirname, 'src/pages'),
        }
    },
};