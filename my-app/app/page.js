// app/home/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/AuthContext';
import CreateCharacterModal from './components/CreateCharacterModal';
import styles from './page.module.css';

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const openModal = () => {
        if (user) {
            setIsModalOpen(true);
        } else {
            router.push('/auth');
        }
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="bg-[#1C1C1C] text-white min-h-[100dvh] flex flex-col">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/dragonball-bg.jpg')] bg-cover bg-center">
                    <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-6">
                            <img src="/logo.png" width="100" height="100" alt="Goku" />
                        <div className="space-y-2 text-center">
                            <h1 className="text-4xl tracking-tighter sm:text-6xl md:text-7xl">Become an AI Dragonball Z</h1>
                            <p className="max-w-[700px] text-lg text-[#BDBDBD]">
                                Explore the epic battles, transformations, and adventures of your favorite Dragonball Z characters.
                            </p>
                        </div>
                        <div className="relative w-full max-w-[1200px] overflow-hidden rounded-lg">
                            <img
                                src="/main-char.jpg"
                                width={1200}
                                height={600}
                                alt="Dragonball Z"
                                className="w-full h-auto object-cover animate-[zoom_10s_ease-in-out_infinite]"
                            />
                        </div>
                        {/* <div className="space-x-4">
                            <button
                                onClick={() => router.push('/characters')}
                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                            >
                                See the Characters
                            </button>
                            <button
                                onClick={openModal}
                                className={`px-4 py-2 ${user ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'} text-white font-semibold rounded-lg shadow-md transition-colors`}
                                aria-label={user ? 'Create Character' : 'Sign Up'}
                            >
                                {user ? (
                                    <span className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M15 7a2 2 0 1 1 4 0v4a1 1 0 1 0 2 0V7a4 4 0 0 0-8 0v3H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V7Zm-5 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                                        </svg>
                                        Create Your Own Character
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                                        </svg>
                                        Create Your Own Character
                                    </span>
                                )}
                            </button>
                        </div> */}
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-[#2C2C2C]">
                    <div className="container px-4 md:px-6 grid gap-12 lg:grid-cols-2">
                        <div className="space-y-4">
                            <div className="inline-block rounded-lg bg-[#FFD700] px-3 py-1 text-sm text-[#1C1C1C] font-semibold">
                                Character Profiles
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Discover Your Favorite Heroes and Villains
                            </h2>
                            <p className="max-w-[600px] text-[#BDBDBD]">
                                Dive into detailed character profiles, learn about their unique abilities, and follow their epic
                                journeys through the Dragonball Z universe.
                            </p>
                            {/* <a
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-[#FFD700] px-8 text-sm font-medium text-[#1C1C1C] shadow transition-colors hover:bg-[#ffc400] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            >
                                View Characters
                            </a> */}

                            <div className="space-x-4">
                                <button
                                    onClick={() => router.push('/characters')}
                                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                                >
                                    See the Characters
                                </button>
                                <button
                                    onClick={openModal}
                                    className={`px-4 py-2 ${user ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'} text-white font-semibold rounded-lg shadow-md transition-colors`}
                                    aria-label={user ? 'Create Character' : 'Sign Up'}
                                >
                                    {user ? (
                                        <span className="flex items-center">
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M15 7a2 2 0 1 1 4 0v4a1 1 0 1 0 2 0V7a4 4 0 0 0-8 0v3H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V7Zm-5 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                                            </svg>
                                            Create Your Own Character
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                                            </svg>
                                            Create Your Own Character
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <img src="/super-sai.jpg" width="300" height="300" alt="Goku" className="rounded-lg object-cover" />
                                <img src="/super-sai.jpg" width="300" height="300" alt="Vegeta" className="rounded-lg object-cover" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <img src="/super-sai.jpg" width="300" height="300" alt="Gohan" className="rounded-lg object-cover" />
                                <img src="/super-sai.jpg" width="300" height="300" alt="Trunks" className="rounded-lg object-cover" />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-[#1C1C1C]">
                    <div className="container px-4 md:px-6 grid gap-12 lg:grid-cols-2">
                        <div className="grid gap-6">
                            <img
                                src="/super-sai.jpg"
                                width="550"
                                height="310"
                                alt="Episode Guide"
                                className="rounded-lg object-cover"
                            />
                            <div className="space-y-4">
                                <div className="inline-block rounded-lg bg-[#FFD700] px-3 py-1 text-sm text-[#1C1C1C] font-semibold">
                                    Episode Guides
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Follow the Epic Sagas</h2>
                                <p className="max-w-[600px] text-[#BDBDBD]">
                                    Explore detailed episode guides, synopses, and air dates to ensure you never miss a moment of the
                                    action-packed Dragonball Z storylines.
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#FFD700] px-8 text-sm font-medium text-[#1C1C1C] shadow transition-colors hover:bg-[#ffc400] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    View Episodes (coming soon)
                                </a>
                            </div>
                        </div>
                        <div className="grid gap-6">
                            <img
                                src="/super-sai.jpg"
                                width="550"
                                height="310"
                                alt="Social Sharing"
                                className="rounded-lg object-cover"
                            />
                            <div className="space-y-4">
                                <div className="inline-block rounded-lg bg-[#FFD700] px-3 py-1 text-sm text-[#1C1C1C] font-semibold">
                                    Social Sharing
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    Connect with the Dragonball Z Community
                                </h2>
                                <p className="max-w-[600px] text-[#BDBDBD]">
                                    Share your favorite moments, theories, and fan art with other Dragonball Z enthusiasts through our
                                    built-in social sharing features.
                                </p>
                                <a
                                    href="#"
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-[#FFD700] px-8 text-sm font-medium text-[#1C1C1C] shadow transition-colors hover:bg-[#ffc400] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Explore Social (coming soon)
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#2C2C2C]">
                <p className="text-xs text-[#BDBDBD]">&copy; 2024 Dragonball Z App. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <a href="#" className="text-xs hover:underline underline-offset-4 text-[#BDBDBD]">Terms of Service</a>
                    <a href="#" className="text-xs hover:underline underline-offset-4 text-[#BDBDBD]">Privacy</a>
                </nav>
            </footer>
            {isModalOpen && <CreateCharacterModal closeModal={closeModal} />}
        </div>
    );
}

function DatabaseIcon(props) {
    return (
        <svg
            {...props}
            xmlns="logo.png"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
    );
}