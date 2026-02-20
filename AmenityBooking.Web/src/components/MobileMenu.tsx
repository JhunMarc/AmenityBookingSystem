import React from 'react';
import { Sidebar } from './SideBar';
import { TermsFooter } from './Footer';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose}
      />
      <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 flex justify-between items-center border-b">
          <img src="/oro.png" alt="Logo" className="h-6" />
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 flex flex-col h-[calc(100%-60px)] justify-between">
          <div className="mobile-sidebar-wrapper">
            <div className="block"><Sidebar isMobile /></div>
          </div>
          <div className="block"><TermsFooter isMobile /></div>
        </div>
      </div>
    </>
  );
};