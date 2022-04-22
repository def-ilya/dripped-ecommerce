import {Image, Link} from '@shopify/hydrogen/client';

/**
 * A client component that defines the navigation for a web storefront
 */
export default function Navigation({collections}) {
  return (
    <nav className="hidden sm:block text-center">
      <ul className="flex items-center justify-center ">
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link
              to={`/collections/${collection.handle}`}
              className="block p-4 hover:opacity-80 transition text-gray-700 text-3xl font-bold uppercase"
            >
              {collection.image ? (
                <div className="relative w-40 h-40 md:h-48 md:w-48 lg:h-64 lg:w-64 m-auto">
                  <Image
                    width="400"
                    height="400"
                    className="rounded-lg aspect-square w-40 h-40 md:h-48 md:w-48 lg:h-64 lg:w-64"
                    data={collection.image}
                  />
                  <div className="absolute w-40 md:w-48 lg:w-64 bottom-0 text-center m-auto left-0 right-0 bg-white opacity-100 transition mix-blend-difference rounded-b-lg">
                    <p className="opacity-100 text-white mix-blend-difference">
                      {collection.title}
                    </p>
                  </div>
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
