import { SmtpClient } from 'https://deno.land/x/smtp/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import { Hono } from 'https://deno.land/x/hono@v3.4.1/mod.ts';
import data from './data.json' assert { type: 'json' };

const { PASSWORD } = Deno.env.toObject();
const client = new SmtpClient();

const app = new Hono();

app.get('/', (c) => c.text('Welcome to dinosaur API!'));

app.post('/api/', async (c) => {
  const connectConfig: any = {
    hostname: 'smtp.gmail.com',
    port: 465,
    username: 'bagusadityaadnyana@gmail.com',
    password: PASSWORD,
  };
  console.log(connectConfig);
  await client.connectTLS(connectConfig);
  const body = await c.req.parseBody();
  console.log(body['email']);
  await client.send({
    from: 'bagusadityaadnyana@gmail.com',
    to: body['email'],
    subject: 'Welcome!',
    content: `<img src="https://api.qrserver.com/v1/create-qr-code/?data=${body['email']}" alt="Seminar 1 Image">`,
  });
  await client.close();
});

Deno.serve(app.fetch);
