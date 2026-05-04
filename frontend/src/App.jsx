import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Breadcrumb from "./components/Breadcrumb";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Trains from "./pages/Trains";
import SeatSelection from "./pages/SeatSelection";
import BookingConfirmation from "./pages/BookingConfirmation";
import Admin from "./pages/Admin";
import TTE from "./pages/TTE";
import Payment from "./pages/Payment";
import TTELogin from "./pages/TTELogin";
import TTEDashboard from "./pages/TTEDashboard";

function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-main">
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trains" element={<Trains />} />
          <Route path="/seats/:trainId" element={<SeatSelection />} />
          <Route path="/confirm" element={<BookingConfirmation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/tte" element={<TTE />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/tte/login" element={<TTELogin />} />
          <Route path="/tte/dashboard" element={<TTEDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
