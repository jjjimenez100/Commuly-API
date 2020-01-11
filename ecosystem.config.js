module.exports = {
  apps: [{
    name: 'commuly-api',
    script: 'src/server.js',
  }],
  deploy: {
    staging: {
      user: 'ec2-user',
      host: 'ec2-54-225-55-219.compute-1.amazonaws.com',
      key: 'commuly-api.pem',
      ref: 'origin/development',
      repo: 'git@gitlab.com:futuritylearning/commuly-api.git',
      path: '/home/ec2-user/commuly-api',
      'post-deploy': 'yarn install && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
