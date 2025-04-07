import { FiBook, FiGlobe, FiImage, FiStar } from "react-icons/fi";
import { defineType, defineField } from "sanity";
import { i18n } from "../../languages";

export default defineType({
  name: "event",
  title: "Event",
  icon: FiBook,
  type: "document",
  groups: [
    {
      name: "i18n",
      title: "Localized",
      icon: FiGlobe,
    },
    {
      name: "media",
      title: "Media",
      icon: FiImage,
    },
    {
      name: "highlight",
      title: "Highlight",
      icon: FiStar,
    },
  ],
  fields: [
    defineField({
      name: "date",
      type: "date",
      title: "Date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "localizedString",
      title: "Title",
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
      name: "description",
      type: "localizedString",
      title: "Description",
      group: ["i18n"],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredImage",
      type: "image",
      title: "Featured Image",
      group: ["media"],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imageGallery",
      type: "array",
      title: "Image Gallery",
      group: ["media"],
      of: [
        {
          type: "object",
          title: "Image",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              type: "localizedString",
              title: "Caption",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "videos",
      type: "array",
      title: "Videos",
      group: ["media"],
      of: [
        {
          type: "object",
          title: "Video",
          fields: [
            defineField({
              name: "url",
              type: "url",
              title: "Video URL",
              validation: (Rule) =>
                Rule.required()
                  .uri({
                    scheme: ["http", "https"],
                    allowRelative: false,
                    relativeOnly: false,
                  })
                  .error("A valid URL is required"),
            }),
            defineField({
              name: "caption",
              type: "localizedString",
              title: "Caption",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      title: "Social Links",
      group: ["media"],
      of: [
        {
          type: "object",
          fields: [
            { name: "url", type: "url", title: "URL" },
            {
              name: "icon",
              type: "string",
              title: "Icon",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter", value: "twitter" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Instagram", value: "instagram" },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "isHighlighted",
      type: "boolean",
      title: "Highlight Event",
      description: "Check this to highlight the event",
      initialValue: false,
    }),
    defineField({
      name: "highlightDetails",
      type: "object",
      title: "Highlight Details",
      group: ["highlight"],
      hidden: ({ document }) => !document?.isHighlighted,
      fields: [
        defineField({
          name: "highlightImageUrl",
          type: "image",
          title: "Highlight Image",
          options: {
            hotspot: true,
          },
          validation: (Rule) =>
            Rule.custom((field, context) => {
              if (context.document?.isHighlighted && !field) {
                return "Highlight Image is required when the event is highlighted";
              }
              return true;
            }),
        }),
        defineField({
          name: "imageAlt",
          type: "string",
          title: "Image Alt Text",
          validation: (Rule) =>
            Rule.custom((field, context) => {
              if (context.document?.isHighlighted && !field) {
                return "Image Alt Text is required when the event is highlighted";
              }
              return true;
            }),
        }),
        defineField({
          name: "heading",
          type: "object",
          title: "Heading",
          fields: [
            {
              name: "prefix",
              type: "string",
              title: "Prefix",
              validation: (Rule) =>
                Rule.custom((field, context) => {
                  if (context.document?.isHighlighted && !field) {
                    return "Prefix is required when the event is highlighted";
                  }
                  return true;
                }),
            },
            {
              name: "highlighted",
              type: "string",
              title: "Highlighted Text",
              validation: (Rule) =>
                Rule.custom((field, context) => {
                  if (context.document?.isHighlighted && !field) {
                    return "Highlighted Text is required when the event is highlighted";
                  }
                  return true;
                }),
            },
            {
              name: "suffix",
              type: "string",
              title: "Suffix",
              validation: (Rule) =>
                Rule.custom((field, context) => {
                  if (context.document?.isHighlighted && !field) {
                    return "Suffix is required when the event is highlighted";
                  }
                  return true;
                }),
            },
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.custom((field, context) => {
          if (context.document?.isHighlighted && !field) {
            return "Highlight Details are required when the event is highlighted";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: `title.${i18n.base}`,
      subtitle: `date`,
      media: "featuredImage",
      isHighlighted: "isHighlighted",
    },
    prepare({
      title,
      subtitle,
      media,
      isHighlighted,
    }: {
      title: string;
      subtitle: any;
      media: any;
      isHighlighted: boolean;
    }) {
      return {
        title: isHighlighted ? `★ ${title}` : title,
        subtitle,
        media: media || FiBook,
      };
    },
  },
});
