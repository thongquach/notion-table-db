require("dotenv").config();
import { Client } from "@notionhq/client";
import http from "http";

interface Customer {
  id: string;
  priority: "Low" | "Medium" | "High";
  status: "Negotiation" | "Closed" | "Proposal" | "Lost" | "Qualified" | "Lead";
  expectedClose: string;
  added: string;
  phone: string;
  estimatedValue: number;
  email: string;
  name: string;
  lastContact: string;
  company: string;
}

const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;

if (!notionDatabaseId || !notionSecret) {
  throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}

const notion = new Client({
  auth: notionSecret,
});

const host = "localhost";
const port = 8000;

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  switch (req.url) {
    case "/":
      const query = await notion.databases.query({
        database_id: notionDatabaseId,
      });

      const list: Customer[] = query.results.map((page) => {
        const properties = page.properties as any;
        const priority = properties.Priority.select.name;
        const status = properties.Status.select.name;
        const expectedClose = properties["Expected Close"].date.start;
        const added = properties.Added.created_time;
        const phone = properties.Phone.phone_number;
        const estimatedValue = properties["Estimated Value"].number;
        const email = properties.Email.email;
        const name = properties.Name.title[0].plain_text;
        const lastContact = properties["Last Contact"].date.start;
        const company = properties.Company.rich_text[0].plain_text;

        return {
          id: page.id,
          priority,
          status,
          expectedClose,
          added,
          phone,
          estimatedValue,
          email,
          name,
          lastContact,
          company,
        };
      });

      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify(list));
      break;

    default:
      res.setHeader("Content-Type", "application/json");
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
