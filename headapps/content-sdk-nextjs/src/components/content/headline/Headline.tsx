import React from 'react';
import { Field, Text } from '@sitecore-content-sdk/nextjs';

type HeadlineProps = {
  fields: {
    Headline: Field<string>;
  };
};

export const Default = (props: HeadlineProps): React.JSX.Element => {
  return (
    <div className="Headline">
       {/* Editable headline */}
      <Text field={props.fields.Headline} tag="h2" />
    </div>
  );
};
