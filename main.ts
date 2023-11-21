import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { Hono } from "https://deno.land/x/hono@v3.4.1/mod.ts";
import data from "./data.json" assert { type: "json" };


const { PASSWORD } = Deno.env.toObject();
const client = new SmtpClient();
const connectConfig: any = {
  hostname: "smtp.gmail.com",
  port: 465,
  username: "bagusadityaadnyana@gmail.com",
  password: PASSWORD,
};
const app = new Hono();

app.get("/", (c) => c.text("Welcome to dinosaur API!"));

app.get("/api/", async (c) => {
  await client.send({
    from: "bagusadityaadnyana@gmail.com",
    to: "jimmyeatcrab@gmail.com",
    subject: "Welcome!",
    content: "Hi from Vuelancer!",
  });
});

app.get("/api/:dinosaur", (c) => {
  const dinosaur = c.req.param("dinosaur").toLowerCase();
  const found = data.find((item) => item.name.toLowerCase() === dinosaur);
  if (found) {
    return c.json(found);
  } else {
    return c.text("No dinosaurs found.");
  }
});

Deno.serve(app.fetch);
