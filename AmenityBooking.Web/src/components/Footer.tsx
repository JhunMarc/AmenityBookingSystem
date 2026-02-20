import { clsx } from 'clsx';

export const TermsFooter = ({ isMobile }: { isMobile?: boolean }) => {
  return (
    <div className={clsx("w-70 xl:w-[305px] flex-shrink-0", !isMobile && "hidden lg:block")}>
        <div className="w-70 xl:w-[305px] flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl shadow-sm p-5">
                <nav className="space-y-1">
                        <button
                            className={
                                "w-full flex items-center gap-2  px-4 py-3 rounded-lg text-sm font-medium transition-colors text-[#696969] hover:text-gray-600 hover:bg-gray-50"
                            }
                        >
                        Need Help
                        </button>
                        <button
                            className={
                                "w-full flex items-center gap-2  px-4 py-3 rounded-lg text-sm font-medium transition-colors text-[#696969] hover:text-gray-600 hover:bg-gray-50"
                            }
                        >
                        Terms & Condition
                        </button>
                        <button
                            className={
                                "w-full flex items-center gap-2  px-4 py-3 rounded-lg text-sm font-medium transition-colors text-[#696969] hover:text-gray-600 hover:bg-gray-50"
                            }
                        >
                        Privacy Policy
                        </button>
                </nav>
            </div>
        </div>
    </div>
  );
};