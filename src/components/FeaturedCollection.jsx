import {Image, Link} from '@shopify/hydrogen';

/**
 * A shared component that defines a single featured collection to display on a storefront
 */
export default function FeaturedCollection({collection}) {
  return collection ? (
    <div className="shadow-xl flex-col md:flex-row rounded-xl flex justify-center align-middle items-center w-auto bg-white overflow-hidden">
      {collection.image ? (
        <Image width="622" height="465" data={collection.image} />
      ) : null}
      <div className="px-10 py-10 lg:py-0 text-center">
        <h2 className="text-gray-700 text-3xl font-bold mb-5">
          {collection.title}
        </h2>
        <p className="text-lg text-gray-500 mb-6">{collection.description}</p>
        <Link
          to={`/collections/${collection.handle}`}
          className="inline-block bg-gray-900 text-white text-lg font-medium rounded-sm py-2 px-8 uppercase hover:bg-gray-500 transition"
        >
          Shop Collection
        </Link>
      </div>
    </div>
  ) : null;
}
