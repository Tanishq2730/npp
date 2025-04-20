import candidates from "./documents/candidates";
import event from "./documents/event";
import pressRelease from "./documents/pressRelease";
import photoGallery from "./documents/photoGallery";
import videoGallery from "./documents/videoGallery";

import localizedArray from "./objects/localizedArray";
import localizedGoogleTranslateString from "./objects/localizedGoogleTranslateString";
import localizedSlug from "./objects/localizedSlug";
import localizedString from "./objects/localizedString";
import localizedText from "./objects/localizedText";
import contactForm from "./documents/contactForm";



export const schemaTypes = [
  // documents ---
  event,
  pressRelease,
  candidates,
  photoGallery,
  videoGallery,
  // blog,
  // objects ----
  localizedGoogleTranslateString,
  localizedSlug,
  localizedString,
  localizedText,
  localizedArray,
  contactForm
];



