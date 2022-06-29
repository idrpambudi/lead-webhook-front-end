module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/leads/0',
                permanent: true,
            },
        ]
    },
}
  