import {cssBundleHref} from '@remix-run/css-bundle';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import {Menu} from '@shopify/hydrogen-react/storefront-api-types';
import type {Shop} from '@shopify/hydrogen/storefront-api-types';
import {type LoaderArgs} from '@shopify/remix-oxygen';
import Lenis from '@studio-freight/lenis';
import {useEffect} from 'react';
import styles from '~/styles/app.css';
import fonts from '~/styles/fonts.css';
import normalize from '~/styles/normalize.css';
import variables from '~/styles/variables.css';
import typography from '~/styles/typography.css';
import favicon from '../public/favicon.svg';
import {
  BaseLayout,
  links as layoutLinks,
} from './components/layout/BaseLayout/BaseLayout';
import {CartProvider, useCart, ShopifyProvider} from '@shopify/hydrogen-react';

export function links() {
  return [
    ...layoutLinks(),
    ...(cssBundleHref ? [{rel: 'stylesheet', href: cssBundleHref}] : []),
    {rel: 'stylesheet', href: styles},
    {rel: 'stylesheet', href: fonts},
    {rel: 'stylesheet', href: normalize},
    {rel: 'stylesheet', href: variables},
    {rel: 'stylesheet', href: typography},
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
  useEffect(() => {
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
        <ShopifyProvider
          storeDomain="https://nextjs-starterr.myshopify.com"
          storefrontToken="9f467473e78044de137a8d5faece0706"
          storefrontApiVersion="2023-04"
          countryIsoCode="NL"
          languageIsoCode="NL"
        >
          <CartProvider
            onLineAdd={() => {
              console.log('a line is being added');
            }}
            onLineAddComplete={() => {
              console.log('a line has been added');
            }}
          >
            <BaseLayout>
              <Outlet />
            </BaseLayout>
            <ScrollRestoration />
            <Scripts />
          </CartProvider>
        </ShopifyProvider>
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
      privacyPolicy {
        title
        body
        handle
      }
      refundPolicy{
        title
        body
        handle
      }
      shippingPolicy{
        title
        body
        handle
      }
      termsOfService{
        title
        body
        handle
      }
    }
    header: menu(handle: "header") {
      handle
      items {
        title
        url
      }
    }

      explore: menu(handle: "footer-explore") {
        items {
          title
          url
        }
      }

      socials: menu(handle: "footer-socials") {
        items {
          title
          url
        }
      }
  }
`;
