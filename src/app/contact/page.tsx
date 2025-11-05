import SideBar from '../components/SideBar';

export default function Contact() {
	return (
		<main className="flex">
			<div className="w-1/4">
				<SideBar />
			</div>
			<div className="w-3/4 flex flex-col">
				<p className="text-[50px] text-center py-[20px]">Get In Touch</p>
				<form className="w-[800px] mx-auto">
					<section className="flex justify-between items-center">
						<div className="flex flex-col gap-4 w-[400px] p-10">
							<label htmlFor="name">Name</label>
							<input type="text" id="name" name="name" className="border-b-1" />
						</div>
						<div className="flex flex-col gap-4 w-[400px] p-10">
							<label htmlFor="email">Email</label>
							<input type="email" id="email" name="email" className="border-b-1" />
						</div>
					</section>

					<section className="flex flex-col gap-4 mt-10 p-10">
						<label htmlFor="message">Message</label>
						<textarea rows={5} id="message" name="message" className="border-b-1" />
					</section>

					<section className="mt-5 flex justify-end items-center">
						<button type="submit" className="border-1 p-3 ">
							Send Now
						</button>
					</section>
				</form>
			</div>
		</main>
	);
}
