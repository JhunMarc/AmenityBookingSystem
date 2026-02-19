Amenity Booking System
A full-stack application for booking facility amenities (Cinema, Gym, Party Hall).

Tech Stack
Frontend: React (Vite), TypeScript, Tailwind CSS
Backend: .NET 9 Web API, Entity Framework Core
Database: SQL Server

📂 Project Structure
AmenityBooking.Web: React Frontend
AmenityBooking.API: .NET Backend

🚀 Setup Instructions
1. Backend Setup (.NET API)
  1. Open the terminal and navigate to the API folder:
     - cd AmenityBooking.API
  2. Configure Database:
      Open appsettings.json.
      Update the DefaultConnection string to match your local SQL Server instance.
  3. Initialize Database & Seeder:
      Run the this command to create the migration and update the database.
      Note: Application has a DbInitializer that will automatically seed the Amenities and Slots upon the first run.
    - dotnet ef migrations add InitialCreate
    - dotnet ef database update
  
  4. Run the API:
    - dotnet run
  The API will start on http://localhost:5153

2. Frontend Setup (React)
  1. Open new terminal and navigate to the Web folder:
    - cd AmenityBooking.Web
  2. Install dependencies:
    - npm install
  3. Run the App:
    - npm run dev
    Open the link provided (usually http://localhost:5173).

ℹ️ Notes on Authentication
Current Implementation: Guest/Kiosk Mode
This solution implements a flexible "Guest Name" entry system (Modal) rather than a strict password-based authentication system.
Reasoning: This design allows the booking widget to be easily integrated into existing legacy systems where the user is already authenticated, 
or used in a standalone "Kiosk" environment within the building lobby for guest to book.

The user's name is stored in the browser session to manage their bookings during that visit, and it is also saved in the database along with their booking details.


✅ Features Implemented
Visual Slot Selection: Grid view of available/booked slots.
Real-time Validation: Prevents double booking of slots.
Optimistic Concurrency: Handles race conditions (if two users book the same slot simultaneously).
Design:  UI matching the provided design mockups.
