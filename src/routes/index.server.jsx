import {
  useShop,
  useShopQuery,
  flattenConnection,
  Link,
  Seo,
  CacheDays,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../components/Layout.server';
import FeaturedCollection from '../components/FeaturedCollection';
import ProductCard from '../components/ProductCard';
import Welcome from '../components/Welcome.server';
import {Suspense} from 'react';
import Navigation from '../components/Navigation.client';
import Disclaimer from '../components/Disclaimer.client';

export default function Index({country = {isoCode: 'US'}}) {
  return (
    <>
      <Disclaimer />
      <Layout>
        <Welcome />
        <Suspense fallback={null}>
          <SeoForHomepage />
        </Suspense>
        <div className="relative mb-6">
          {/* <Suspense fallback={<BoxFallback />}>
          <FeaturedCollectionBox country={country} />

        </Suspense> */}
          <Suspense fallback={<BoxFallback />}>
            <FeaturedProductsBox country={country} />
          </Suspense>
        </div>
      </Layout>
    </>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
      }}
    />
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}

function FeaturedProductsBox({country}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection = collections[0];
  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;

  return (
    <div className="bg-white p-12 shadow-md  mb-10">
      {/* <Navigation collections={collections} storeName="" /> */}
      <Navigation collections={collections} />

      {featuredProductsCollection ? (
        <>
          <div className="flex justify-between items-center mb-8 text-md font-medium">
            <span className="text-black uppercase">
              {/* {featuredProductsCollection.title} */}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="md:hidden text-center">
            <Link
              to={`/collections/${featuredProductsCollection.handle}`}
              className="text-blue-600"
            >
              Shop all
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCollectionBox({country}) {
  const {languageCode} = useShop();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
      language: languageCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredCollection =
    collections && collections.length > 1 ? collections[1] : collections[0];

  return <FeaturedCollection collection={featuredCollection} />;
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

const QUERY = gql`
  query indexContent($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(first: 12) {
      edges {
        node {
          handle
          id
          title
          image {
            id
            url
            altText
            width
            height
          }
          products(first: 24) {
            edges {
              node {
                handle
                id
                title
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
                      image {
                        id
                        url
                        altText
                        width
                        height
                      }
                      priceV2 {
                        currencyCode
                        amount
                      }
                      compareAtPriceV2 {
                        currencyCode
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
