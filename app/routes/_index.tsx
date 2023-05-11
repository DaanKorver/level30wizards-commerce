import {cssBundleHref} from '@remix-run/css-bundle';
import {LinksFunction} from '@shopify/remix-oxygen';
import {Hero, links as heroLinks} from '~/components/shared/Hero/Hero';

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
  ];
};

export default function Index() {
  return (
    <div>
      <Hero />
    </div>
  );
}
