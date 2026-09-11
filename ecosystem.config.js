module.exports = {
    apps: [
        {
            name: "github-stats-service",
            script: "./dist/index.js",
            exec_mode: "fork",
            instances: 1,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
