// src/services/contentfulClient.ts
import { createClient } from 'contentful';

const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN;
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master';

if (!space || !accessToken) {
  // Fail early in dev if env vars are missing
  console.warn(
    '[contentfulClient] Missing Contentful env vars. Check VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_DELIVERY_TOKEN.'
  );
}

export const contentfulClient = createClient({
  space,
  accessToken,
  environment,
});
