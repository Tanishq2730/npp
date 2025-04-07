import { defineField, defineType } from "sanity";

export default defineType({
  name: "candidates",
  title: "Candidates",
  type: "document",
  fields: [
    defineField({
      name: "state",
      title: "State",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "constituencies",
      title: "Constituencies",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "constituency",
              title: "Constituency",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "candidate",
              title: "Candidate",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "pcNo",
              title: "PC No",
              type: "localizedString",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "pdf",
              title: "PDF",
              type: "file", // Changed from 'url' to 'file'
              validation: (Rule) => Rule.required(),
              options: {
                accept: ".pdf", // Optional: restrict to PDF files only
              },
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "state.en",
    },
    // @ts-ignore - Overloading the type causes an error, so we ignore it here
    prepare({ title }: { title: string }) {
      return {
        title,
      };
    },
  },
});
