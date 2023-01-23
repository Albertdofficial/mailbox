import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import Message from "./pages/Message";

function App() {
  return (
    <div className="main">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/inbox" element={<Inbox />} />
        </Routes>
        <Routes>
          <Route path="/message/:id" element={<Message />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
