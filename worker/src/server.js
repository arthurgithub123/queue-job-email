const nodemailer = require('nodemailer');

const bull = require('bull');

const passwordCreationEmailQueue = new bull(
  'PasswordCreationEmailQueue', 
  { redis: { host: 'redis', port: 6379 } }
);

// worker/consumer
passwordCreationEmailQueue.process(
  async (job) => {
    const transporter = nodemailer.createTransport({
      host:   'smtp.gmail.com',
      port:   587,
      secure: false,
      auth:   { user: 'your email', pass: 'your password' },
      tls:    { rejectUnauthorized: false }
    });

    return transporter.sendMail({
      from:    'your email',
      to:      job.data.email,
      subject: 'Criação de senha',
      html:
        "<div style='text-align: center;'>" +
          "<p>Olá, " + job.data.name + "</p>" +
          "<p>Clique no link abaixo para criar sua senha: <p>" +
          "<p><a href='" + job.data.urlWithToken + "'>" + job.data.urlWithToken + "</a></p>" +
          "<p>Obrigado, </p>" +
          "<p>Equipe System Name</p>" +
        "</div>"
    });
  }
);

passwordCreationEmailQueue.on('active', (job, result) => 
  console.log(
    'job active. Job: \n',
    job,
    '\nresult: \n',
    result
  )
);

passwordCreationEmailQueue.on('completed', (job, result) => 
  console.log(
    'job completed. Job: \n',
    job,
    '\ndate: ',
    new Date(),
    '\nresult: \n',
    result
  )
);

passwordCreationEmailQueue.on('failed', (job, result) => 
  console.log(
    'job failed. Job: \n',
    '\nresult: \n',
    result
  )
);
