// URL for the front end from this Studio build
// This works because this one repo builds both a Studio and the Next.js front end separately, but using the same branch
// demo-blog-platform.sanity.build is the frontend domain
// demo-blog-platform-studio.sanity.build is the studio domain
export const enableUrl = process.env.SANITY_STUDIO_VERCEL_ENV
  ? `https://${
      process.env.SANITY_STUDIO_VERCEL_ENV === "production"
        ? "demo-blog-platform.sanity.build" // I don't understand why the primary domain doesn't have a variable
        : process.env.SANITY_STUDIO_VERCEL_BRANCH_URL?.replace(
            "demo-blog-platform-studio",
            "demo-blog-platform",
          )
    }/api/draft`
  : "http://localhost:3000/api/draft";

export { locate } from "./locate";
