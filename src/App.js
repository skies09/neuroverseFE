import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BlogList from "./pages/BlogList";
import BlogPost from "./pages/BlogPost";
import Footer from "./components/Footer";

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-gray-50 flex flex-col">
				<Navbar />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/blog" element={<BlogList />} />
						<Route path="/blog/:slug" element={<BlogPost />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
