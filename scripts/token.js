const inquirer = require('inquirer');
const request = require('request-promise');
const format = require('date-fns/format');

const questions = [
  {
    type: 'input',
    name: 'clientId',
    message: 'Client ID',
  },
  {
    type: 'input',
    name: 'clientSecret',
    message: 'Client Secret',
  },
];

inquirer.prompt(questions).then(answers => {
  const key = `${answers.clientId}:${answers.clientSecret}`;
  const token = Buffer.from(key).toString('base64');

  request({
    uri: 'https://accounts.spotify.com/api/token',
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
    form: {
      grant_type: 'client_credentials',
    },
    json: true,
  })
    .then(response => {
      const expire = format(
        new Date().setSeconds(response.expires_in),
        'HH:mm:ss',
      );

      console.log('');
      console.log('Token:', response.access_token);
      console.log('Until:', expire);
      console.log('');
    })
    .catch(err => {
      console.error(err.message);
    });
});
