import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogAPI } from "../services/api";

const BlogList = () => {
	const [posts, setPosts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [postsResponse, categoriesResponse] = await Promise.all([
					blogAPI.getPosts(),
					blogAPI.getCategories(),
				]);
				setPosts(postsResponse.data.results || postsResponse.data);
				setCategories(categoriesResponse.data.results);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const formatDate = (dateString) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const filteredPosts = selectedCategory
		? posts.filter(
				(post) =>
					post.category &&
					post.category.id === parseInt(selectedCategory)
		  )
		: posts;

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Header */}
			<div className="text-center mb-12">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
				<p className="text-gray-600 text-lg">
					Explore our collection of articles and insights
				</p>
			</div>

			{/* Category Filter */}
			<div className="mb-8">
				<div className="flex flex-wrap gap-2 justify-center">
					<button
						onClick={() => setSelectedCategory("")}
						className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
							selectedCategory === ""
								? "bg-indigo-600 text-white"
								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
						}`}
					>
						All Categories
					</button>
					{categories &&
						categories.map((category) => (
							<button
								key={category.id}
								onClick={() =>
									setSelectedCategory(category.id.toString())
								}
								className={`px-4 py-2 rounded-full text-sm font-medium transition duration-200 ${
									selectedCategory === category.id.toString()
										? "bg-indigo-600 text-white"
										: "bg-gray-200 text-gray-700 hover:bg-gray-300"
								}`}
							>
								{category.name}
							</button>
						))}
				</div>
			</div>

			{/* Posts Grid */}
			{loading ? (
				<div className="flex justify-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredPosts.map((post) => (
						<article
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
								<h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-indigo-600">
									<Link to={`/blog/${post.slug}`}>
										{post.title}
									</Link>
								</h2>
								<p className="text-gray-600 mb-4 line-clamp-3">
									{post.excerpt ||
										post.content.substring(0, 150) + "..."}
								</p>
								<div className="flex items-center justify-between">
									<div className="flex items-center text-sm text-gray-500">
										<span>
											By{" "}
											{post.author.first_name ||
												post.author.username}
										</span>
										<span className="mx-2">•</span>
										<span>
											{formatDate(post.created_at)}
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
						</article>
					))}
				</div>
			)}

			{!loading && filteredPosts.length === 0 && (
				<div className="text-center py-12">
					<p className="text-gray-600 text-lg">
						{selectedCategory
							? "No posts found in this category."
							: "No posts available."}
					</p>
				</div>
			)}
		</div>
	);
};

export default BlogList;
