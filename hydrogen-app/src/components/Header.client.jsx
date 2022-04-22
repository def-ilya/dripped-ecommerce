import {useEffect, useState} from 'react';
import {Link} from '@shopify/hydrogen/client';

import CartToggle from './CartToggle.client';
import {useCartUI} from './CartUIProvider.client';
import CountrySelector from './CountrySelector.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({collections, storeName}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const {isCartOpen} = useCartUI();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    setScrollbarWidth(scrollbarWidth);
  }, [isCartOpen]);

  return (
    <header className="h-20 lg:h-24" role="banner">
      <div
        className={`z-20 h-12 lg:h-20 w-full border-b border-gray-200 px-6 md:px-8 md:py-3 lg:pt-2 lg:pb-2 mx-auto bg-white ${
          isMobileNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        <div
          className="h-full flex lg:flex-col place-content-between"
          style={{
            paddingRight: isCartOpen ? scrollbarWidth : 0,
          }}
        >
          <div className="text-center w-full flex justify-between items-center">
            {/* <CountrySelector /> */}
            <div className="order-3">
              <MobileNavigation
                collections={collections}
                isOpen={isMobileNavOpen}
                setIsOpen={setIsMobileNavOpen}
              />
            </div>

            <Link
              className="font-black text-3xl tracking-widest order-2"
              to="/"
            >
              dripped.
            </Link>
            <div className="order-1 sm:order-3 mt-3">
              <CartToggle
                handleClick={() => {
                  if (isMobileNavOpen) setIsMobileNavOpen(false);
                }}
              />
            </div>
          </div>
          {/* <Navigation collections={collections} storeName={storeName} /> */}
        </div>
      </div>
    </header>
  );
}
