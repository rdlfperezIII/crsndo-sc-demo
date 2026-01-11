import { Text, Image, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { BaseRouteData } from 'lib/component-props/base-fields';
import { JSX } from 'react';

type ComponentContentProps = {
  id?: string;
  styles?: string;
  children: JSX.Element;
};

const ComponentContent = ({ id, styles, children }: ComponentContentProps) => {
  return (
    <div className={`component content-intro ${styles ?? ''}`} id={id || undefined}>
      <div className="component-content">{children}</div>
    </div>
  );
};

export const Default = (props: ComponentProps): JSX.Element => {
  const { page } = useSitecore();

  const id = props.params?.RenderingIdentifier;
  console.log('ContentIntro context:', page?.layout?.sitecore?.route);

  const event = page?.layout?.sitecore?.route as BaseRouteData | undefined;

  const fields = event?.fields;
  console.log('ContentIntro fields:', fields);
  //handler
  if (!fields?.Title || !fields?.Intro) {
    return (
      <ComponentContent id={id} styles={props.params?.styles}>
        <section>[Content Intro]</section>
      </ComponentContent>
    );
  }

  return (
    <ComponentContent id={id} styles={props.params?.styles}>
      <section>
        <h1>
          <Text field={fields.Title} />
        </h1>

        <div className="lead">
          <Text field={fields.Intro} />
        </div>

        {fields.ContentImage && (
          <div>
            <Image
              field={fields.ContentImage}
              className="img-fluid"
              imageParams={{ mw: 1000, mh: 568 }}
            />
          </div>
        )}
      </section>
    </ComponentContent>
  );
};
