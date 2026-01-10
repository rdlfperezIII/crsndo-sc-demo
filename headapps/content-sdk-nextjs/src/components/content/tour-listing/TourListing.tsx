import React, { useEffect, useState } from 'react';
import { Field, Text } from '@sitecore-content-sdk/nextjs';
import styles from './TourList.module.css'; // import CSS module

type TourListingProps = {
  fields: {
    TourListHeadline: Field<string>;
  };
};

type Tour = {
  name: string;
  description: string;
  imageSrc?: string;
};

const ENDPOINT =
  'https://xmc-crescendocofa97-crsndoscdem2e49-deve2c3.sitecorecloud.io/sitecore/api/graph/edge';

const API_KEY = '30451c768376477b8b76372ba43a002f';

export const Default = (props: TourListingProps): React.JSX.Element => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
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
                path: "/sitecore/content/demo-sites/demo-site/Structured Content/Tours"
                language: "en"
              ) {
                children {
                  results {
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

      const mappedTours: Tour[] = results.map((item: any) => {
        const fields = item.fields;

        const getField = (fieldName: string) =>
          fields.find((f: any) => f.name === fieldName);

        return {
          name: getField('Name')?.value ?? 'No title',
          description: getField('Description')?.value ?? '',
          imageSrc: getField('Image')?.jsonValue?.value?.src,
        };
      });

      setTours(mappedTours);
    };

    fetchTours();
  }, []);

  return (
    <div className={styles['tour-list']}>
      {/* Jumbotron */}
      <div className={styles['jumbotron']}>
        <Text
          field={props.fields.TourListHeadline}
          tag="h1"
          className="display-4"
        />
    
      </div>

      {/* Cards */}
      <div className={styles['tour-list-cards']}>
        {tours.map((tour, idx) => (
          <div className={styles['card']} key={idx}>
            {tour.imageSrc && (
              <img
                src={tour.imageSrc}
                className={styles['card-img-top']}
                alt={tour.name}
              />
            )}
            <div className={styles['card-body']}>
              <h5 className={styles['card-title']}>{tour.name}</h5>
              <p className={styles['card-text']}>{tour.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
