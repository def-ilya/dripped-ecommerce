import {Image, Link} from '@shopify/hydrogen';
import {useRef, useState} from 'react';
/**
 * A shared component that defines a single featured collection to display on a storefront
 */
export default function FeaturedCollection({collection}) {
  const modal = useRef(null);

  const [visible, setVisible] = useState(true);

  function agreeToTerms() {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      localStorage.setItem('needsToAccept', 'false');
      setVisible(false);
    }
  }

  const needsToAccept =
    typeof window !== 'undefined'
      ? localStorage.getItem('needsToAccept')
      : null;

  return (
    <>
      {needsToAccept !== 'false' && (
        <div
          ref={modal}
          className="flex justify-center items-center top-0 left-0 w-screen h-screen bg-zinc-900 bg-opacity-40 z-30 fixed"
        >
          <div className="bg-white rounded-lg p-12 text-l md:text-2xl m-2">
            <h2 className="uppercase font-bold text-3xl text-center mb-3">
              Disclaimer
            </h2>
            <p className="">
              I understand that the entities and persons representing
              drippedofficial (hereby, "the Vendor") make no statement on the
              authenticity of products supplied.
            </p>
            <p className="">
              I acknowledge that I am over 16, and I fully understand that goods
              are sold with no guarantee or promise of authenticity, implied or
              explicit.
            </p>
            <p className="">
              I acknowledge that clothing is not explicitly sold as "imitation"
              or "replica", due to the unverifiable nature of the items listed.
            </p>
            <p className="">
              I understand that clothing is listed by the Vendor where
              authenticity cannot be verified beyond reasonable doubt.
            </p>
            <p className="">
              I understand that all items are listed "as-is", within the legal
              constraints of a vendor in New Zealand.
            </p>
            <div className="flex w-full justify-center items-center">
              <button
                onClick={agreeToTerms}
                className="text-xl md:text-3xl m-auto text-white bg-slate-600 p-3 mt-4 rounded-lg hover:bg-slate-400 transition"
              >
                I have read and understood the above terms.
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
