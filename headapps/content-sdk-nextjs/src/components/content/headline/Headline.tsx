import React from 'react';
import { Field, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';



interface Fields {
  Headline: Field<string>;
}

type HeadlineProps = ComponentProps & {
  fields: Fields;
};



interface HeadlineContentProps extends HeadlineProps {
  renderText: (fields: Fields) => React.JSX.Element;
}

const Headline = (props: HeadlineContentProps): React.JSX.Element => {
  return (
    <div className="Headline">
       {/* Editable headline */}
      <Text field={props.fields.Headline} tag="h1" />
    </div>
  );
};





export const Default = (props: HeadlineContentProps): React.JSX.Element => {
  const renderText = (fields: Fields) => (
    <>
    <div className="Headline">
       {/* Editable headline */}
       Variant One
      <Text field={fields.Headline} tag="h1" />
    </div>
    </>
  );

  return <Headline {...props} renderText={renderText} />;
};

export const AnotherVariant = (props: HeadlineContentProps): React.JSX.Element => {
  const renderText = (fields: Fields) => (
    <>
       <div className="Headline">
       {/* Editable headline */}
       Variant Two
      <Text field={fields.Headline} tag="h1" />
    </div>
    </>
  );

  return <Headline {...props} renderText={renderText} />;
};
