import { JSX } from 'react';
import {
  DateField,
  useSitecore,
  RouteData,
  Field,
  ComponentParams,
  ComponentRendering,
  Text,
} from '@sitecore-content-sdk/nextjs';

interface TourDetailsProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

type TourDetailsRouteData = RouteData & {
  fields: Fields;
};

// Should be reused across all components
type ComponentContentProps = {
  id: string;
  styles: string;
  children: JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  const id = props.id;
  return (
    <div className={`component tour-details ${props.styles}`} id={id ? id : undefined}>
      <div className="component-content">{props.children}</div>
    </div>
  );
};

// Should be reused across all components

interface Fields {
  Name?: Field<string>;
  Description?: Field<string>;
  Duration?: Field<string>;
  Date?: Field<string>;
  TourOperator?: Field<string>;
  Body?: Field<string>;
  HideEventDate?: Field<boolean>;
}

export const Default = (props: TourDetailsProps): JSX.Element => {
  const { page } = useSitecore();
  const currentPage = page?.layout?.sitecore?.route as TourDetailsRouteData;

  // Prefer fields passed directly to the component; fall back to route fields if present
  const fields = props.fields ?? (currentPage?.fields as unknown as Fields);

  console.log('TourDetails rendering parameter:', props.rendering?.params);
  console.log('TourDetails parameter:', props.params);

  const id = props.params?.RenderingIdentifier;

  return (
    <ComponentContent id={id} styles={props.params?.styles}>
      <div className="alert alert-info mt-1">
        <h4>Tour details</h4>

        {fields?.Name && (
          <h2>
            <Text field={fields.Name as any} />
          </h2>
        )}

        {fields?.Description && (
          <div className="mt-2">
            <Text field={fields.Description as any} />
          </div>
        )}

        {fields?.Body && (
          <div className="mt-3" dangerouslySetInnerHTML={{ __html: fields.Body.value as string }} />
        )}

        {fields?.HideEventDate?.value !== true && fields?.Date && (
          <h5 className="mt-2">
            Date:{' '}
            <DateField
              field={fields.Date as any}
              render={(date) => <span>{date && date.toDateString()}</span>}
            />
          </h5>
        )}

        {fields?.Duration && (
          <h5 className="mt-1">
            Duration: <Text field={fields.Duration as any} />
          </h5>
        )}
      </div>
    </ComponentContent>
  );
};
