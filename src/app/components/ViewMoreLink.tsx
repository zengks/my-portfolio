export default function ViewMore({ target_url }: { target_url: string }) {
	return (
		<p className="text-end italic text-gray-500">
			<a href={target_url} className="hover:text-gray-700 hover:underline">
				View More
			</a>
		</p>
	);
}
