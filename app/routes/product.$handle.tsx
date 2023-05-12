import {LoaderArgs} from '@shopify/remix-oxygen';

export const loader = async ({params}: LoaderArgs) => {
  console.log(params);
  return params;
};

export default function ProductRoute() {
  return (
    <div style={{paddingTop: '70px'}}>
      <h1>Hello world</h1>
    </div>
  );
}
