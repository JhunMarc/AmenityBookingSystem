import { useState } from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { UserProvider } from './context/UserContext';
import { AmenityList } from './components/AmenityList';
import { BookingForm } from './components/BookingForm';
import { Header } from './components/Header';
import { Sidebar } from './components/SideBar';
import { TermsFooter } from './components/Footer';
import { UserModal } from './components/UserModal';
import { MobileMenu } from './components/MobileMenu';
import { Loader } from './components/Loader';
 
function DashboardContent() {
  const { isLoadingInitial } = useBooking();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (isLoadingInitial) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }
  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      <UserModal /> 
      <Header />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <main className="flex-1 py-4 px-4 md:px-8 md:py-8">
        <div className="w-full mx-auto max-w-6xl flex flex-col lg:flex-row gap-8 xl:gap-[48px]">
          <aside className="hidden lg:flex flex-col justify-between w-70 xl:w-[305px] shrink-0">
            <Sidebar />
            <TermsFooter />
          </aside>

          <div className="flex-1 min-w-0">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-sm text-[#535353] lg:pt-3 ">Book Appointments</h2>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-2 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <div className="space-y-1.5">
                  <span className="block w-6 h-0.5 bg-gray-800"></span>
                  <span className="block w-6 h-0.5 bg-gray-800"></span>
                  <span className="block w-4 h-0.5 bg-gray-800"></span>
                </div>
              </button>
            </div>
            
            <AmenityList />
            <BookingForm />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <BookingProvider>
        <div className="min-h-screen fixed inset-0 z-0 bg-cover bg-center grayscale-100" 
             style={{ backgroundImage: "url('/bg.jpg')" }} />
        <div className="fixed inset-0 bg-white/[80%] min-h-screen backdrop-blur-xs z-0"></div>
        
        <DashboardContent />
      </BookingProvider>
    </UserProvider>
  );
}

export default App;