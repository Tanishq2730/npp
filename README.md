This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

import type { PressRelease } from 'app/lib/interface';
import { client } from '../lib/sanity';

// Define the query to fetch press release data
async function getData() {
const query = `
    *[_type == "pressRelease"]{
      _id,
      date,
      title,
      subtitle,
      slug,
      image,
      content,
      showFeatured
    }`;

const data = await client.fetch(query);
return data;
}

// Component to display the press releases
export default async function Home() {
const data: PressRelease[] = await getData();

return (

<div>
<h1>Press Releases</h1>
{data.map((pressRelease) => (
<div
key={pressRelease.\_id} // eslint-disable-line no-underscore-dangle >
<h2>{pressRelease.title}</h2>
<p>{pressRelease.date}</p>
<p>{pressRelease.subtitle}</p>
{pressRelease.image && (
<img
              src={pressRelease.image.asset.url}
              alt={pressRelease.title}
              width={600}
              height={400}
            />
)}
<div>
<p>{pressRelease.content}</p>
</div>
{pressRelease.showFeatured && (
<div>
<h3>Featured Section</h3>
{/_ Display additional featured content _/}
</div>
)}
</div>
))}
</div>
);
}
