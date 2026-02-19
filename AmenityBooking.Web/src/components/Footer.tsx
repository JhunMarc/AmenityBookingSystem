import React from 'react';

export const TermsFooter: React.FC = () => {
  return (

    <div className="w-64 flex-shrink-0 hidden lg:block">
        <div className="bg-white rounded-xl shadow-sm p-4 ">
            <nav className="space-y-1">
                    <button
                        className={
                            "w-full flex items-center gap-4 px-4 py-4 rounded-lg text-sm font-medium transition-colors text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                        }
                    >
                      Need Help
                    </button>
                    <button
                        className={
                            "w-full flex items-center gap-4 px-4 py-4 rounded-lg text-sm font-medium transition-colors text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                        }
                    >
                      Terms & Condition
                    </button>
                    <button
                        className={
                            "w-full flex items-center gap-4 px-4 py-4 rounded-lg text-sm font-medium transition-colors text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                        }
                    >
                      Privacy Policy
                    </button>
            </nav>
        </div>
    </div>
  );
};