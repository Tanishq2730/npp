import { FiBook, FiGlobe, FiImage } from "react-icons/fi";
import { defineType, defineField } from "sanity";
import { SanityImageObjectStub } from "@sanity/asset-utils";

import { i18n } from "../../languages";

export default defineType({
  name: "blog",
  title: "Blogs",
  icon: FiBook,
  type: "document",
  // top level filter tab
  groups: [
    {
      name: "i18n",
      title: "Localised",
      icon: FiGlobe,
    },
    {
      name: "media",
      title: "Media",
      icon: FiImage,
    },
  ],
  //  main content
  fields: [
    defineField({
      name: "title",
      type: "localizedString",
      group: ["i18n"],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "localizedSlug",
      group: ["i18n"],
      validation: (Rule) =>
        Rule.required().error(
          "A slug is required to generate a page on the website",
        ),
    }),

    defineField({
      name: "image",
      type: "image",
      group: ["media"],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "details",
      type: "localizedArray",
      group: ["i18n"],
      validation: (Rule) =>
        Rule.required().error(
          "A Description is required to generate a blog on the website",
        ),
    }),
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
      description: `details.${i18n.base}`,
      image: "image",
    },
    // Overloading the type causes an error
    // @ts-ignore
    prepare({
      title,
      description,
      image,
    }: {
      title: string;
      description: any;
      image: SanityImageObjectStub;
    }) {
      const firstBlock =
        description && description.length > 0 ? description[0] : null;
      const blockText = firstBlock
        ? firstBlock.children.map((child: any) => child.text).join(" ")
        : "No description";
      return {
        title,
        subtitle: blockText,
        media: image ?? FiBook,
      };
    },
  },
});
