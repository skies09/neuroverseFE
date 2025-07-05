import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogAPI } from "../services/api";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Home = () => {
	const [featuredPosts, setFeaturedPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchFeaturedPosts = async () => {
			try {
				const response = await blogAPI.getFeaturedPosts();
				setFeaturedPosts(response.data);
			} catch (error) {
				console.error("Error fetching featured posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFeaturedPosts();
	}, []);

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<div>
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="text-4xl md:text-6xl font-bold mb-6">
							Welcome to MyBlog
						</h1>
						<p className="text-xl md:text-2xl mb-8 text-indigo-100">
							Discover amazing stories, insights, and ideas
						</p>
						<Link
							to="/blog"
							className="inline-flex items-center bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
						>
							Explore Blog
							<ArrowRightIcon className="ml-2 h-5 w-5" />
						</Link>
					</div>
				</div>
			</section>

			{/* Featured Posts Section */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
							Featured Posts
						</h2>
						<p className="text-gray-600 text-lg">
							Check out our latest and most popular articles
						</p>
					</div>

					{loading ? (
						<div className="flex justify-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{featuredPosts.map((post) => (
								<div
									key={post.id}
									className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200"
								>
									{post.featured_image && (
										<img
											src={post.featured_image}
											alt={post.title}
											className="w-full h-48 object-cover"
										/>
									)}
									<div className="p-6">
										{post.category && (
											<span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mb-3">
												{post.category.name}
											</span>
										)}
										<h3 className="text-xl font-semibold text-gray-900 mb-3">
											{post.title}
										</h3>
										<p className="text-gray-600 mb-4">
											{post.excerpt ||
												post.content.substring(0, 100) +
													"..."}
										</p>
										<div className="flex items-center justify-between">
											<div className="flex items-center">
												<span className="text-sm text-gray-500">
													By{" "}
													{post.author.first_name ||
														post.author.username}
												</span>
												<span className="mx-2 text-gray-300">
													•
												</span>
												<span className="text-sm text-gray-500">
													{formatDate(
														post.created_at
													)}
												</span>
											</div>
											<Link
												to={`/blog/${post.slug}`}
												className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
											>
												Read More
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					)}

					{!loading && featuredPosts.length === 0 && (
						<div className="text-center py-8">
							<p className="text-gray-600">
								No featured posts available.
							</p>
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default Home;
