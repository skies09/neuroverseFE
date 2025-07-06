import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-colorFour shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link to="/" className="flex-shrink-0">
							<span className="text-2xl font-bold text-indigo-600 font-quicksand">
								Neuroverse
							</span>
						</Link>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							to="/"
							className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-semibold transition duration-200 font-lexend"
						>
							Home
						</Link>
						<Link
							to="/blog"
							className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-semibold transition duration-200 font-lexend"
						>
							Blog
						</Link>
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={toggleMenu}
							className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
						>
							{isOpen ? (
								<XMarkIcon className="h-6 w-6" />
							) : (
								<Bars3Icon className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<Link
								to="/"
								className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
								onClick={() => setIsOpen(false)}
							>
								Home
							</Link>
							<Link
								to="/blog"
								className="text-gray-700 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
								onClick={() => setIsOpen(false)}
							>
								Blog
							</Link>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
