// src/sanityClient.ts
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "1ksqsjxh", // 🔁 Replace with your Project ID
  dataset: "production",
  apiVersion: "v2022-03-07",
  token:
    "skoHFqihkSDicgq6EeIOhAsE6RThtZIhRpTxuIao28BTnS1E4OP6MbBxSaw5ogaoPQM6JNbtW4pkrwA8vTVAFASGfVY4E4tP7p7GycIKj6PsQzeidIiSZNRawfXgDGvFWiAOKMDhT7A7sdNGIhkk982BomhsjSvfSRr55EiUGTe83tgHh43H", // 🔁 Replace with your Sanity Token (write access)
  useCdn: false,
});

export default client;
