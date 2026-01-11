import {
  Field,
  ImageField,
  RichTextField,
  RouteData,
  TextField,
} from '@sitecore-content-sdk/nextjs';

/**
 * Shared base content fields
 */
export type BaseContentFields = {
  fields: {
    Title: Field<string>;
    Intro: TextField;
    Description: RichTextField;
    ContentImage: ImageField;
  };
};

/**
 * Shared root data returned from Layout Service
 */
export type BaseRouteData = RouteData & BaseContentFields;

