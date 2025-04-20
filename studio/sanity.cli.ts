// import {defineCliConfig} from 'sanity/cli'

// export default defineCliConfig({
//   api: {
//     projectId: '1ksqsjxh',
//     dataset: 'production',
//   },
// })
// lib/sanityClient.ts

// import { retry } from 'middleware';
import { createClient } from "@sanity/client";
const client = createClient({
  projectId: "1ksqsjxh", // replace with your project ID
  dataset: "production", // replace with your dataset name
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-08-05",
  // middlewares: [retry()],
});

export default client;
