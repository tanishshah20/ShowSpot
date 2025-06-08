import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Transition show={isOpen} as="div" className="relative z-40 md:hidden">
      <Dialog
        as="div" 
        className="fixed inset-0 flex z-40" 
        onClose={setIsOpen}
      >
        <Transition.Child
          as="div"
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <Transition.Child
          as="div"
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>

            <div className="pt-5 pb-4">
              <div className="flex-shrink-0 flex items-center px-4">
                <Link href="/" className="text-xl font-bold">ShowSpot</Link>
              </div>
              <div className="mt-5">
                <nav className="px-2 space-y-1">
                  <Link href="/concerts" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                    Concerts
                  </Link>
                  <Link href="/sports" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                    Sports
                  </Link>
                  <Link href="/arts-theater" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                    Arts & Theater
                  </Link>
                  <Link href="/festivals" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                    Festivals
                  </Link>
                  <Link href="/comedy" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                    Comedy
                  </Link>
                  <Link href="/profile" className="block px-3 py-2 border-t-2 border-t-black rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                    Profile
                  </Link>
                </nav>
              </div>
            </div>
          </Dialog.Panel>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default MobileMenu;