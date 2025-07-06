import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogAPI } from "../services/api";
import {
	ArrowLeftIcon,
	CalendarIcon,
	UserIcon,
	TagIcon,
} from "@heroicons/react/24/outline";

const BlogPost = () => {
	const { slug } = useParams();
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await blogAPI.getPost(slug);
				setPost(response.data);
			} catch (error) {
				console.error("Error fetching post:", error);
				setError("Post not found");
			} finally {
				setLoading(false);
			}
		};

		fetchPost();
	}, [slug]);

	const formatDate = (dateString) => {
		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
			</div>
		);
	}

	if (error || !post) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900 mb-4 font-comic">
						Post Not Found
					</h1>
					<p className="text-gray-600 mb-8 font-lexend">
						The post you're looking for doesn't exist.
					</p>
					<Link
						to="/blog"
						className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-comic"
					>
						<ArrowLeftIcon className="h-5 w-5 mr-2" />
						Back to Blog
					</Link>
				</div>
			</div>
		);
	}

	return (
		<article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			{/* Back to Blog Link */}
			<div className="mb-8">
				<Link
					to="/blog"
					className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium font-comic"
				>
					<ArrowLeftIcon className="h-5 w-5 mr-2" />
					Back to Blog
				</Link>
			</div>

			{/* Post Header */}
			<header className="mb-8">
				{post.category && (
					<span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mb-4 font-comic">
						<TagIcon className="h-4 w-4 inline mr-1" />
						{post.category.name}
					</span>
				)}

				<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-quicksand">
					{post.title}
				</h1>

				{/* Post Meta */}
				<div className="flex flex-wrap items-center gap-4 text-gray-600 border-b border-gray-200 pb-6 font-comic">
					<div className="flex items-center">
						<UserIcon className="h-5 w-5 mr-2" />
						<span>
							By {post.author.first_name || post.author.username}
						</span>
					</div>
					<div className="flex items-center">
						<CalendarIcon className="h-5 w-5 mr-2" />
						<span>Published {formatDate(post.created_at)}</span>
					</div>
					{post.updated_at !== post.created_at && (
						<div className="flex items-center">
							<CalendarIcon className="h-5 w-5 mr-2" />
							<span>Updated {formatDate(post.updated_at)}</span>
						</div>
					)}
				</div>
			</header>

			{/* Featured Image */}
			{post.featured_image && (
				<div className="mb-8">
					<img
						src={post.featured_image}
						alt={post.title}
						className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
					/>
				</div>
			)}

			{/* Post Content */}
			<div className="prose prose-lg max-w-none">
				<div className="text-gray-800 leading-relaxed whitespace-pre-line font-funnel">
					{post.content}
				</div>
			</div>

			{/* Post Footer */}
			<footer className="mt-12 pt-8 border-t border-gray-200">
				<div className="flex flex-wrap items-center justify-between">
					<div className="flex items-center space-x-4">
						<span className="text-gray-600 font-comic">
							Share this post:
						</span>
						<div className="flex space-x-2">
							<button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition duration-200">
								Instagram
							</button>
							<button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm transition duration-200">
								Facebook
							</button>
							<button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition duration-200">
								Tiktok
							</button>
						</div>
					</div>

					{post.author && (
						<div className="mt-4 sm:mt-0">
							<div className="flex items-center font-comic">
								<div className="ml-3">
									<p className="text-sm font-medium text-gray-900">
										{post.author.first_name &&
										post.author.last_name
											? `${post.author.first_name} ${post.author.last_name}`
											: post.author.username}
									</p>
									<p className="text-sm text-gray-500">
										Author
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</footer>
		</article>
	);
};

export default BlogPost;
