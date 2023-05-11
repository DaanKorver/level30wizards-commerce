import {cssBundleHref} from '@remix-run/css-bundle';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import {Menu} from '@shopify/hydrogen-react/storefront-api-types';
import type {Shop} from '@shopify/hydrogen/storefront-api-types';
import {type LoaderArgs} from '@shopify/remix-oxygen';
import Lenis from '@studio-freight/lenis';
import {useLayoutEffect} from 'react';
import styles from '~/styles/app.css';
import fonts from '~/styles/fonts.css';
import normalize from '~/styles/normalize.css';
import variables from '~/styles/variables.css';
import favicon from '../public/favicon.svg';
import {
  BaseLayout,
  links as layoutLinks,
} from './components/layout/BaseLayout/BaseLayout';

export function links() {
  return [
    ...layoutLinks(),
    ...(cssBundleHref ? [{rel: 'stylesheet', href: cssBundleHref}] : []),
    {rel: 'stylesheet', href: styles},
    {rel: 'stylesheet', href: fonts},
    {rel: 'stylesheet', href: normalize},
    {rel: 'stylesheet', href: variables},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
}

export async function loader({context}: LoaderArgs) {
  const layout = await context.storefront.query<{shop: Shop; menu: Menu}>(
    LAYOUT_QUERY,
  );
  return {layout};
}

export default function App() {
  const {layout} = useLoaderData<typeof loader>();

  const {name, primaryDomain} = layout.shop;
  let {items} = layout.menu;
  items = items.map((item) => {
    if (!item.url) return item;
    item.url = item.url.replace(primaryDomain.url, '');
    return item;
  });

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      orientation: 'vertical', // vertical, horizontal
      gestureOrientation: 'vertical', // vertical, horizontal, both
      smoothWheel: true,
      smoothTouch: false,
      infinite: false,
    });
    window.Lenis = lenis;

    let rAF: number;
    function raf(time: number) {
      lenis.raf(time);
      rAF = requestAnimationFrame(raf);
    }
    rAF = requestAnimationFrame(raf);

    return () => {
      rAF = requestAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <BaseLayout items={items}>
          <Outlet />
        </BaseLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
      primaryDomain {
        url
      }
    }
    menu(handle: "header") {
      handle
      items {
        title
        url
      }
    }
  }
`;
