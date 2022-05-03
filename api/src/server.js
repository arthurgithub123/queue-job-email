const express = require('express');

const bull = require('bull');

const app = express();

app.use(express.json());

const passwordCreationEmailQueue = new bull(
  'PasswordCreationEmailQueue', 
  { redis: { host: 'redis', port: 6379 } }
);

app.post('/api/users/administrator', async (request, response) => {
  // ... logic for creating and saving an administrator
  
  // producer (add jobs to queue)
  await passwordCreationEmailQueue.add(request.body);

  return response.status(201).json({
    statusCode: 201,
    message:
    `Administrator created. A link for password creation will be sent to ${request.body.email}`
  });
});

app.listen(44332, () => console.log('Server running on 44332'));
