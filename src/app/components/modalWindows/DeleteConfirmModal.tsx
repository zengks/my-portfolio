'use client';

interface DeleteConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	itemType: string | null;
}

export default function DeleteConfirmModal({
	isOpen,
	onClose,
	onConfirm,
	itemType,
}: DeleteConfirmModalProps) {
	if (!isOpen) return null;

	const formatType = (type: string | null) => {
		switch (type) {
			case 'work':
				return 'Work Experience';
			case 'aboutUser':
				return 'About User Section';
			case 'project':
				return 'Project';
			case 'education':
				return 'Education';
			case 'certificate':
				return 'Certificate';
			case 'skill':
				return 'Skill';
			default:
				return 'Item';
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center flex-col p-4 bg-gray-900/75 backdrop-blur-sm transition-opacity duration-300">
			<div className="modal-window">
				<div className="modal-header">
					<div className="flex justify-between items-center">
						<svg
							className="w-8 h-8 me-3 text-red-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<p className="modal-header-title">Delete {formatType(itemType)}</p>
					</div>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
						<span className="sr-only">Close</span>
						<svg
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div className="border p-10 text-center text-2xl font-semibold">
					<p>Are you sure you want to delete this?</p>
					<p>This action cannot be undone.</p>
				</div>

				<div className="modal-footer">
					<button onClick={onClose} className="modal-secondary-btn">
						Cancel
					</button>
					<button onClick={onConfirm} className="modal-primary-btn">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
