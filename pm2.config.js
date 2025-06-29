module.exports = {
  apps: [
    {
      name: "web-e-resume",
      script: ".output/server/index.mjs",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
