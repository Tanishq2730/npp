// sanity.js
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  apiVersion: "2023-08-05",
  projectId: "1ksqsjxh", // replace with your project ID
  dataset: "production", // replace with your dataset name
  useCdn: true, // `false` if you want to ensure fresh data
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
