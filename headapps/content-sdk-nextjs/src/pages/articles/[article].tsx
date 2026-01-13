import React, { JSX } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Default as TourDetails } from 'src/components/content/tour-details/TourDetails';
import { Field } from '@sitecore-content-sdk/nextjs';

const ENDPOINT =
  'https://xmc-crescendocofa97-crsndoscdem2e49-deve2c3.sitecorecloud.io/sitecore/api/graph/edge';
const API_KEY = '30451c768376477b8b76372ba43a002f';

type ArticleFields = {
  Name?: Field<string>;
  Description?: Field<string>;
  Body?: Field<string>;
  // add other fields as needed and map them below
};

type Props = {
  fields: ArticleFields;
  slug: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        sc_apikey: API_KEY,
      },
      body: JSON.stringify({
        query: `
          query {
            item(
              path: "/sitecore/content/demo-sites/demo-site/Structured Content/Articles"
              language: "en"
            ) {
              children {
                results {
                  name
                  fields {
                    name
                    value
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const json = await res.json();
    const results = json?.data?.item?.children?.results || [];

    const paths = results.map((item: any) => ({
      params: { article: slugify(item.name) },
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error('Error fetching article paths', error);
    return { paths: [], fallback: 'blocking' };
  }
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = (context.params?.article as string) || '';

  try {
    // Fetch children and find matching item by slug
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        sc_apikey: API_KEY,
      },
      body: JSON.stringify({
        query: `
          query {
            item(
              path: "/sitecore/content/demo-sites/demo-site/Structured Content/Articles"
              language: "en"
            ) {
              children {
                results {
                  id
                  name
                  fields {
                    name
                    value
                    jsonValue
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const json = await res.json();
    const results = json?.data?.item?.children?.results || [];

    const matching = results.find((it: any) => slugify(it.name) === slug);

    if (!matching) {
      return { notFound: true, revalidate: 5 };
    }

    const getField = (fields: any[], fieldName: string) => {
      const f = fields?.find((x: any) => x.name.toLowerCase() === fieldName.toLowerCase());
      return f?.value ?? undefined;
    };

    // Map fields into the shape expected by the TourDetails component (lightweight)
    const mappedFields: ArticleFields = {
      Name: { value: getField(matching.fields, 'Name') } as Field<string>,
      Description: { value: getField(matching.fields, 'Description') } as Field<string>,
      Body: { value: getField(matching.fields, 'Body') } as Field<string>,
    };

    return {
      props: {
        fields: mappedFields,
        slug,
      },
      revalidate: 5,
    };
  } catch (error) {
    console.error('Error fetching article', error);
    return { notFound: true, revalidate: 5 };
  }
};

const ArticlePage = ({ fields }: Props): JSX.Element => {
  // The TourDetails component expects a specific props shape. We'll pass minimal stubs for rendering and params
  const rendering = { params: {} } as any;
  const params = { RenderingIdentifier: 'articles-article' } as any;

  return (
    <div className="container mt-3">
      {/* You can replace this with Layout if you want consistent site chrome */}
      <TourDetails rendering={rendering} params={params} fields={fields as any} />
    </div>
  );
};

export default ArticlePage;
