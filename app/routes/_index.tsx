import {cssBundleHref} from '@remix-run/css-bundle';
import {LinksFunction, LoaderArgs, json} from '@shopify/remix-oxygen';
import {Hero, links as heroLinks} from '~/components/shared/Hero/Hero';
import {
  MainContainer,
  links as mainContainerLinks,
} from '~/components/shared/MainContainer/MainContainer';

export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{rel: 'stylesheet', href: cssBundleHref}] : []),
    ...heroLinks(),
    ...mainContainerLinks(),
  ];
};

export async function loader({params, context: {storefront}}: LoaderArgs) {
  const settings = await storefront.query(
    `
  #graphql
  query a {
    menu(handle: "Header") {
      title
    }
  }
  `,
  );
  return json(settings);
}

export default function Index() {
  return (
    <div>
      <Hero />
      <MainContainer />
    </div>
  );
}
