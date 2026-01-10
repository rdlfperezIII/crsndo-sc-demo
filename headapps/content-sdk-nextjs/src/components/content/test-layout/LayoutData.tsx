import React, { useState, useEffect } from 'react';
import client from 'lib/sitecore-client'; // your SitecoreClient instance
import { JSX } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';

const LayoutDataTest = (): JSX.Element => {

const pagePath = useSitecore().page.layout.sitecore.context.itemPath;
console.log('Page data in LayoutDataTest:', pagePath);
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    // Fetch the page layout data using SitecoreClient
    const fetchData = async () => {
      try {
      
        const result = await client.getPage(pagePath, {
          site: 'demo-site', // replace with config.sitecoreSiteName if you have it
          locale: 'en',
        });
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch layout data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Layout data (SitecoreClient)</h1>
      <pre style={{ maxHeight: '400px', overflow: 'auto' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default LayoutDataTest;
