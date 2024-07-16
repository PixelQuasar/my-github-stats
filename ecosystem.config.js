module.exports = {
    apps: [
        {
            name: "github-stats-service",
            script: "npm run prod",
            //script: 'next dev -H 0.0.0.0 -p 3001',
            "watch-ignore": ["/\\]./", "node_modules", "*.log", "public", "src"],
            watch: false,
        },
    ],
};
