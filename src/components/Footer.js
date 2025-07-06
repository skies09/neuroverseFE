import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-colorFour text-white py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Brand */}
					<div className="col-span-1 md:col-span-2">
						<h3 className="text-2xl font-bold mb-4 font-quicksand">
							Neuroverse
						</h3>
						<p className="text-gray-300 mb-4 font-lexend">
							Discover amazing stories, insights, and ideas from
							our community of writers. Join us on this journey of
							knowledge and creativity.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-semibold mb-4 font-quicksand">
							Quick Links
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-gray-300 hover:text-white transition duration-200 font-lexend"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/blog"
									className="text-gray-300 hover:text-white transition duration-200 font-lexend"
								>
									Blog
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h4 className="text-lg font-semibold mb-4 font-quicksand">
							Connect
						</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-gray-300 hover:text-white transition duration-200 font-lexend"
								>
									Twitter
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-300 hover:text-white transition duration-200 font-lexend"
								>
									Facebook
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-300 hover:text-white transition duration-200 font-lexend"
								>
									LinkedIn
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="border-t border-gray-700 mt-8 pt-8 text-center">
					<p className="text-gray-300 font-comic">
						© {new Date().getFullYear()} Neuroverse. All rights
						reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
