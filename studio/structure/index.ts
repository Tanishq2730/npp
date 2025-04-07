import {
  StructureResolver,
  DefaultDocumentNodeResolver,
} from "sanity/structure";
import transifex from "./transifex";

export const structure: StructureResolver = (S) =>
  // S.list()
  //   .title('Content')
  //   .items([S.documentTypeListItem('blog').title('Blogs'), S.divider()])

  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("event").title("events"),
      S.divider(),
      S.documentTypeListItem("pressRelease").title("Press Release"),
      S.divider(),
      S.documentTypeListItem("candidates").title("candidates"),
      S.divider(),
      S.documentTypeListItem("photoGallery").title("Photo Gallery"),
      S.divider(),
      S.documentTypeListItem("videoGallery").title("video Gallery"),
      S.divider(),
    ]);

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType },
) => {
  // const client = getClient({apiVersion: `2023-01-01`})

  switch (schemaType) {
    case "event":
      return S.document().views([S.view.form(), transifex(S)]);
    case "pressRelease":
      return S.document().views([S.view.form(), transifex(S)]);
    case "candidates":
      return S.document().views([S.view.form(), transifex(S)]);
    case "photoGallery":
      return S.document().views([S.view.form(), transifex(S)]);
    case "videoGallery":
      return S.document().views([S.view.form(), transifex(S)]);
    default:
      return S.document();
  }
};
