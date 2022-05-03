# queue-job-email

###### Nodejs application with an API for creating administrators
###### users. When user is created the API sends a Job to a Worker 
###### with his or her data to process and send a response to the
###### user saying that a link for password creation will be sent
###### to usersEmail.
#
###### The Worker will send an Email for users email for he or she
###### to create his or her password in the system.
#
### Dependencies in your machine
- Nodejs
- Docker
- Some application for making requests (Postman, Insomnia, Curl or others)

### Installation
1. Clone project with
```git clone https://github.com/arthurgithub123/queue-job-email.git```

### Running the application
1. Start Docker
2. Go to project root folder
3. You need to add an email and password (line 17) in Worker application that would be the System email
4. For this application you will need to enable less secure app in your email account used above.
**But Google will not have this configuration available anymore in may 30 2022 (https://myaccount.google.com/security)**
5. Execute `docker compose up` in terminal
6. Once the containers are running, make a request, with `post` verb, for `http://localhost:22222/api/users/administrator`
with the request body being:
`{
  "email": "usersEmail",
  "name": "usersName"
}`
You can send several requests and see that they are sent to a queue and the worker process each of them in FIFO order
