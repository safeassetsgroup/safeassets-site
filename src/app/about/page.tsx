"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Insert VALUES array used by the About page
const VALUES = [
	{
		title: "Safety First",
		desc: "We prioritise the wellbeing of people in everything we do.",
		icon: (
			<svg
				className="w-10 h-10 text-orange-500"
				viewBox="0 0 24 24"
				fill="none"
				aria-hidden
			>
				<path
					d="M12 2l8 4v4c0 5.5-3.6 10.7-8 12-4.4-1.3-8-6.5-8-12V6l8-4z"
					stroke="currentColor"
					strokeWidth="1.2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M9.5 12.5l2 2 4-4"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		title: "Innovation",
		desc: "We leverage technology to solve real-world safety and asset challenges.",
		icon: (
			<svg
				className="w-10 h-10 text-orange-500"
				viewBox="0 0 24 24"
				fill="none"
				aria-hidden
			>
				<path
					d="M12 2v6"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M5 11a7 7 0 0014 0"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M8 21h8"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		title: "Integrity",
		desc: "We operate with transparency, honesty, and accountability.",
		icon: (
			<svg
				className="w-10 h-10 text-orange-500"
				viewBox="0 0 24 24"
				fill="none"
				aria-hidden
			>
				<rect
					x="3"
					y="3"
					width="18"
					height="18"
					rx="2"
					stroke="currentColor"
					strokeWidth="1.2"
				/>
				<path
					d="M8 12h8"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
				/>
				<path
					d="M8 16h8"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
				/>
			</svg>
		),
	},
];

// Change page background to match Industries (subtle grey) and keep cards white for contrast
export default function AboutPage() {
	return (
		// show the layout/body background (bg-gray-50 from layout.tsx)
		<main className="min-h-screen bg-transparent text-gray-900">
			{/* Hero: keep transparent so layout background shows through */}
			<section className="bg-transparent">
				<div className="max-w-6xl mx-auto px-6 py-20 text-center">
					<div className="mx-auto w-full max-w-md">
						<img
							src="/brand/logo.png"
							alt="SafeAssets Group logo"
							width={300}
							height={90}
							className="mx-auto object-contain rounded-md shadow-sm"
							onError={(e) => {
								(e.currentTarget as HTMLImageElement).src = "/placeholder.jpg";
							}}
						/>
					</div>

					<h1 className="mt-8 text-4xl md:text-5xl font-extrabold leading-tight text-orange-600">
						About SafeAssets Group
					</h1>

					<p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
						Protecting and enabling industries with cutting-edge safety and asset
						management solutions.
					</p>

					<div className="mt-8 flex justify-center gap-4">
						<Link
							href="/contact"
							className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold px-5 py-3 rounded-lg shadow"
							style={{ color: "#000" }}
						>
							Get in touch
						</Link>
						<Link
							href="/industries"
							className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-800 px-5 py-3 rounded-lg hover:shadow"
						>
							Browse industries
						</Link>
					</div>
				</div>
			</section>

			{/* Main content: only individual cards should be bg-white for contrast */}
			<section className="max-w-6xl mx-auto px-6 -mt-12">
				<div className="grid gap-8 md:grid-cols-2 items-center">
					{/* Image / Logo side */}
					<div className="order-2 md:order-1">
						{/* card: ensure this wrapper is bg-white and not the full section */}
						<div className="bg-white rounded-lg shadow-lg overflow-hidden">
							<BrandMediaBox />
						</div>
					</div>

					{/* Story text */}
					<div className="order-1 md:order-2">
						<div className="bg-white rounded-lg shadow-lg p-8">
							<h2 className="text-2xl font-bold mb-4">Our Story</h2>
							<p className="text-gray-700 mb-4">
								Founded with a mission to deliver unparalleled safety and operational
								excellence, SafeAssets Group partners with industries across
								agriculture, mining, construction, energy, and defence.
							</p>
							<p className="text-gray-700 mb-4">
								We combine advanced technology with deep industry expertise to help
								clients safeguard their most valuable resources — their people and
								assets — while improving efficiency and sustainability.
							</p>
							<p className="text-gray-700">
								Our solutions are trusted by leaders who demand reliability,
								Innovation, and compliance without compromise.
							</p>
						</div>
					</div>
				</div>

				{/* Values */}
				<div className="mt-12">
					<h3 className="text-2xl font-bold text-center mb-6">Our Values</h3>
					<div className="grid gap-6 md:grid-cols-3">
						{VALUES.map((v, i) => (
							<article
								key={i}
								className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition"
								aria-labelledby={`value-${i}`}
							>
								<div className="flex items-center justify-center mb-4">
									{v.icon}
								</div>
								<h4
									id={`value-${i}`}
									className="text-lg font-semibold text-center mb-2"
								>
									{v.title}
								</h4>
								<p className="text-gray-600 text-center">{v.desc}</p>
							</article>
						))}
					</div>
				</div>

				{/* CTA */}
				<div className="mt-12 text-center">
					<div className="inline-block bg-white rounded-lg shadow-lg p-8">
						<h4 className="text-xl font-bold mb-3">
							Partner with SafeAssets Group
						</h4>
						<p className="text-gray-700 mb-6">
							Let’s discuss how we can help your organisation improve safety,
							compliance, and performance.
						</p>
						<div className="flex justify-center gap-4">
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black font-semibold px-5 py-3 rounded-lg shadow"
								style={{ color: "#000" }}
							>
								Get in Touch
							</Link>
							<Link
								href="/industries"
								className="inline-flex items-center gap-2 border border-gray-200 bg-white text-gray-800 px-5 py-3 rounded-lg hover:shadow"
							>
								Learn more
							</Link>
						</div>
					</div>
				</div>

				<div className="py-16" />
			</section>
		</main>
	);
}

/** Small media box used on About page — shows logo if available, fallback card otherwise */
function BrandMediaBox() {
	const [exists, setExists] = useState<boolean | null>(null);

	useEffect(() => {
		let mounted = true;
		const img = new Image();
		img.onload = () => mounted && setExists(true);
		img.onerror = () => mounted && setExists(false);
		img.src = "/brand/logo.png";
		return () => {
			mounted = false;
		};
	}, []);

	if (exists === null) {
		return (
			<div className="bg-white rounded-lg shadow-lg h-80 flex items-center justify-center">
				<div className="text-gray-400">Loading…</div>
			</div>
		);
	}

	if (exists) {
		return (
			<div className="bg-white rounded-lg shadow-lg overflow-hidden">
				<img
					src="/brand/logo.png"
					alt="SafeAssets Group"
					className="w-full h-80 object-contain rounded-md"
				/>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-lg h-80 flex flex-col items-start justify-center p-8 gap-4">
			<div className="text-sm font-semibold uppercase text-orange-500">
				SafeAssets Group
			</div>
			<h3 className="text-2xl font-bold">Delivering safety & reliability</h3>
			<p className="text-gray-600 max-w-sm">
				We design proven safety and asset management systems for mining,
				construction, agriculture, energy, and defence.
			</p>
			<Link
				href="/contact"
				className="mt-3 inline-block bg-orange-50 text-orange-600 px-4 py-2 rounded-md font-semibold hover:bg-orange-100"
			>
				Contact us
			</Link>
		</div>
	);
}
