import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="flex flex-col h-screen items-center justify-center bg-gray-50">
			<h2 className="text-4xl font-bold text-gray-900">404</h2>
			<p className="text-lg text-gray-600">Page not found</p>
			<Link
				href="/"
				className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
			>
				Return Home
			</Link>
		</div>
	);
}
