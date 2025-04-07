import groq from "groq";
import { map } from "rxjs";
import { ListenQueryOptions } from "sanity";
import type { DocumentLocationResolver } from "sanity/presentation";

const DEFAULT_LANG = "en";

export const locate: DocumentLocationResolver = (params, context) => {
  let doc$ = null;
  const queryParams = { ...params, lang: DEFAULT_LANG };
  const listenOptions: ListenQueryOptions = { perspective: "previewDrafts" };

  if (params.type === "event") {
    doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{
            "slug": slug[$lang],
            "title": title[$lang]
          }`,
      queryParams,
      listenOptions,
    );

    return doc$.pipe(
      map((doc) => {
        console.log(doc);
        if (!doc || !doc.slug?.current) {
          return null;
        }

        return {
          locations: [
            {
              title: doc.title || "Untitled",
              href: `/${DEFAULT_LANG}/${doc.slug.current}`,
            },
            {
              title: "Home",
              href: `/${DEFAULT_LANG}`,
            },
          ],
        };
      }),
    );
  } else if (params.type === "pressRelease") {
    doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{
            "slug": slug[$lang],
            "title": title[$lang]
          }`,
      queryParams,
      listenOptions,
    );

    return doc$.pipe(
      map((doc) => {
        console.log(doc);
        if (!doc || !doc.slug?.current) {
          return null;
        }

        return {
          locations: [
            {
              title: doc.title || "Untitled",
              href: `/${DEFAULT_LANG}/${doc.slug.current}`,
            },
            {
              title: "Home",
              href: `/${DEFAULT_LANG}`,
            },
          ],
        };
      }),
    );
  } else if (params.type === "candidates") {
    doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{
            "slug": slug[$lang],
            "title": title[$lang]
          }`,
      queryParams,
      listenOptions,
    );

    return doc$.pipe(
      map((doc) => {
        console.log(doc);
        if (!doc || !doc.slug?.current) {
          return null;
        }

        return {
          locations: [
            {
              title: doc.title || "Untitled",
              href: `/${DEFAULT_LANG}/${doc.slug.current}`,
            },
            {
              title: "Home",
              href: `/${DEFAULT_LANG}`,
            },
          ],
        };
      }),
    );
  } else if (params.type === "photoGallery") {
    doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{
            "slug": slug[$lang],
            "title": title[$lang]
          }`,
      queryParams,
      listenOptions,
    );

    return doc$.pipe(
      map((doc) => {
        console.log(doc);
        if (!doc || !doc.slug?.current) {
          return null;
        }

        return {
          locations: [
            {
              title: doc.title || "Untitled",
              href: `/${DEFAULT_LANG}/${doc.slug.current}`,
            },
            {
              title: "Home",
              href: `/${DEFAULT_LANG}`,
            },
          ],
        };
      }),
    );
  } else if (params.type === "videoGallery") {
    doc$ = context.documentStore.listenQuery(
      groq`*[_id == $id][0]{
            "slug": slug[$lang],
            "title": title[$lang]
          }`,
      queryParams,
      listenOptions,
    );

    return doc$.pipe(
      map((doc) => {
        console.log(doc);
        if (!doc || !doc.slug?.current) {
          return null;
        }

        return {
          locations: [
            {
              title: doc.title || "Untitled",
              href: `/${DEFAULT_LANG}/${doc.slug.current}`,
            },
            {
              title: "Home",
              href: `/${DEFAULT_LANG}`,
            },
          ],
        };
      }),
    );
  }

  return null;
};
