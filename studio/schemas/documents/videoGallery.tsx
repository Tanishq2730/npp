// schemas/videoGallery.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "videoGallery",
  title: "Video Gallery",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Gallery Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "date",
              title: "Date",
              type: "date",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "videoUrl",
              title: "Video URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
