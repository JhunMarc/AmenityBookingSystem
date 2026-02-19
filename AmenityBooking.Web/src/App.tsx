import { BookingProvider } from './context/BookingContext';
import { UserProvider } from './context/UserContext';
import { AmenityList } from './components/AmenityList';
import { BookingForm } from './components/BookingForm';
import { Header } from './components/Header';
import { Sidebar } from './components/SideBar';
import { TermsFooter } from './components/Footer';
import { UserModal } from './components/UserModal';

function App() {
  return (
    <UserProvider>
      <BookingProvider>
        <div className="min-h-screen relative bg-origin-border grayscale-50 bg-cover bg-center " style={{
          backgroundImage: "url('/bg.jpg')",
        }}>
          <div className="absolute  inset-0 bg-white/50 backdrop-blur-xs backdrop-grayscale backdrop-brightness-[1] z-0 filter "></div>
            <div className="relative z-10 min-h-screen flex flex-col">
              <UserModal /> 
              <Header />
              <div className="mx-auto p-6 md:p-8">
                <div className='w-10/12 mx-auto flex gap-8'>
                  <div className="flex flex-col  justify-between ">
                    <Sidebar />
                    <TermsFooter />
                  </div>
                  <main className="flex-1 min-w-0 pt-3">
                      <div className="mb-5">
                          <h2 className="text-xl text-gray-800 font-medium">Book Appointments</h2>
                      </div>
                      <AmenityList />
                      <BookingForm />
                  </main>
                </div>
            </div>
            </div>
        </div>
      </BookingProvider>
    </UserProvider>
  );
}

export default App;