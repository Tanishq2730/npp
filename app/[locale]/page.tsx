"use client";

import Home from "@/components/home/Home";

const HomePage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default HomePage;

// 'use client';

// import type { PressRelease } from 'app/lib/interface';
// import client from 'studio/sanity.cli';

// // Define the query to fetch press release data
// async function getData() {
//   const query = `
//     *[_type == "pressRelease"]{
//       _id,
//       date,
//       title,
//       subtitle,
//       slug,
//       image,
//       content,
//       showFeatured
//     }`;

//   const data = await client.fetch(query);
//   return data;
// }

// // Component to display the press releases
// export default async function Home() {
//   const data: PressRelease[] = await getData();

//   return (
//     <div>
//       <h1>Press Releases</h1>
//       {data.map((pressRelease) => (
//         <div
//           key={pressRelease._id} // eslint-disable-line no-underscore-dangle
//         >
//           <h2>{pressRelease.title}</h2>
//           <p>{pressRelease.date}</p>
//           <p>{pressRelease.subtitle}</p>
//           {pressRelease.image && (
//             <img
//               src={pressRelease.image.asset.url}
//               alt={pressRelease.title}
//               width={600}
//               height={400}
//             />
//           )}
//           <div>
//             <p>{pressRelease.content}</p>
//           </div>
//           {pressRelease.showFeatured && (
//             <div>
//               <h3>Featured Section</h3>
//               {/* Display additional featured content */}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
