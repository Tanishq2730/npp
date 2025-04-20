import { Card } from "@sanity/ui";
import { defineConfig, isKeyedObject } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { documentInternationalization } from "@sanity/document-internationalization";
import { languageFilter } from "@sanity/language-filter";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { schemaVisualizer } from "sanity-plugin-schema-visualizer";
import { googleTranslate } from "sanity-plugin-google-translate";

import { structure, defaultDocumentNode } from "./structure";
import { schemaTypes } from "./schemas";
import { i18n } from "./languages";
import { enableUrl, locate } from "./presentation";
import { theme } from "./utils/theme";

export default defineConfig({
  name: "default",
  title: "npp",
  projectId: "1ksqsjxh",
  dataset: "production",

  theme,

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    presentationTool({
      locate,
      previewUrl: {
        draftMode: {
          enable: enableUrl,
        },
      },
    }),
    documentInternationalization({
      supportedLanguages: i18n.languages,
      schemaTypes: [
        `event`,
        `pressRelease`,
        `candidates`,
        `photoGallery`,
        `videoGallery`,
        `contactForm`
      ],
    }),
    internationalizedArray({
      languages: i18n.languages,
      defaultLanguages: [i18n.base],
      fieldTypes: ["string", "text"],
    }),
    languageFilter({
      supportedLanguages: i18n.languages,
      defaultLanguages: [i18n.base],
      filterField: (enclosingType, member, selectedLanguageIds) => {
        // Filter internationalized arrays
        if (
          enclosingType.jsonType === "object" &&
          enclosingType.name.startsWith("internationalizedArray") &&
          "kind" in member
        ) {
          const language = isKeyedObject(member.field.path[1])
            ? member.field.path[1]._key
            : null;

          return language ? selectedLanguageIds.includes(language) : false;
        }

        // Filter internationalized objects
        // `localeString` must be registered as a custom schema type
        if (
          enclosingType.jsonType === "object" &&
          enclosingType.name.startsWith("locale")
        ) {
          return selectedLanguageIds.includes(member.name);
        }

        return true;
      },
    }),
    googleTranslate(),
    visionTool(),
    schemaVisualizer({
      defaultSchemaTypes: [
        "event",
        "pressRelease",
        "candidates",
        "photoGallery",
        "videoGallery",
        "contactForm"
      ],
      hiddenSchemaTypes: ["translation.metadata"],
    }),
  ],
  schema: {
    // @ts-expect-error
    types: schemaTypes,
  },
  studio: {
    components: {
      navbar: (props) => (
        <Card scheme="dark">{props.renderDefault(props)}</Card>
      ),
    },
  },
  form: {
    components: {
      field: (props) => {
        return props.renderDefault(props);
      },
    },
  },
  tools: (prev, { currentUser }) => {
    const isAdmin = currentUser?.roles.some(
      (role) => role.name === "administrator",
    );

    if (isAdmin) {
      return prev;
    }

    return prev.filter((tool) => tool.name !== "vision");
  },
});

// import { Card } from '@sanity/ui';
// import { defineConfig, isKeyedObject } from 'sanity';
// import { structureTool } from 'sanity/structure';
// import { visionTool } from '@sanity/vision';
// import { presentationTool } from 'sanity/presentation';
// import { documentInternationalization } from '@sanity/document-internationalization';
// import { languageFilter } from '@sanity/language-filter';
// import { internationalizedArray } from 'sanity-plugin-internationalized-array';
// import { schemaVisualizer } from 'sanity-plugin-schema-visualizer';
// import { googleTranslate } from 'sanity-plugin-google-translate';

// import { structure, defaultDocumentNode } from './structure';
// import { schemaTypes } from './schemas';
// import { i18n } from './languages';
// import { enableUrl, locate } from './presentation';
// import { theme } from './utils/theme';

// import { media } from 'sanity-plugin-media';

// export default defineConfig({
//   name: 'default',
//   title: 'npp',
//   projectId: '1ksqsjxh',
//   dataset: 'production',

//   theme,

//   plugins: [
//     structureTool({
//       structure,
//       defaultDocumentNode,
//     }),
//     presentationTool({
//       locate,
//       previewUrl: {
//         draftMode: {
//           enable: enableUrl,
//         },
//       },
//     }),
//     documentInternationalization({
//       supportedLanguages: i18n.languages,
//       schemaTypes: ['event', 'pressRelease'],
//     }),
//     internationalizedArray({
//       languages: i18n.languages,
//       defaultLanguages: [i18n.base],
//       fieldTypes: ['string', 'text'],
//     }),
//     languageFilter({
//       supportedLanguages: i18n.languages,
//       defaultLanguages: [i18n.base],
//       filterField: (enclosingType, member, selectedLanguageIds) => {
//         // Filter internationalized arrays
//         if (
//           enclosingType.jsonType === 'object' &&
//           enclosingType.name.startsWith('internationalizedArray') &&
//           'kind' in member
//         ) {
//           const language = isKeyedObject(member.field.path[1]) ? member.field.path[1]._key : null;

//           return language ? selectedLanguageIds.includes(language) : false;
//         }

//         // Filter internationalized objects
//         // `localeString` must be registered as a custom schema type
//         if (enclosingType.jsonType === 'object' && enclosingType.name.startsWith('locale')) {
//           return selectedLanguageIds.includes(member.name);
//         }

//         return true;
//       },
//     }),
//     googleTranslate(),
//     visionTool(),
//     schemaVisualizer({
//       defaultSchemaTypes: ['event', 'pressRelease'],
//       hiddenSchemaTypes: ['translation.metadata'],
//     }),
//     media(), // Register the media plugin here
//   ],
//   schema: {
//     // @ts-expect-error
//     types: schemaTypes,
//   },
//   studio: {
//     components: {
//       navbar: (props) => <Card scheme="dark">{props.renderDefault(props)}</Card>,
//     },
//   },
//   form: {
//     components: {
//       field: (props) => {
//         return props.renderDefault(props);
//       },
//     },
//   },
//   tools: (prev, { currentUser }) => {
//     const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator');

//     if (isAdmin) {
//       return prev;
//     }

//     return prev.filter((tool) => tool.name !== 'vision');
//   },
// });
