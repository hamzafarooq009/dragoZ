// app/home/page.js
"use client";

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
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
        <div className={`min-h-screen flex flex-col items-center justify-center ${styles.bgDragonBall} relative overflow-hidden`}>
            <Canvas >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars />
                <OrbitControls />
            </Canvas>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-1/4 text-center text-white"
            >
                <h1 className="text-5xl font-bold mb-8">Welcome to Dragon Ball Universe</h1>
                <div className="space-x-4">
                    <button
                        onClick={() => router.push('/characters')}
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        See the Characters
                    </button>
                    <button
                        onClick={openModal}
                        className={`px-4 py-2 ${user ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'
                            } text-white font-semibold rounded-lg shadow-md transition-colors`}
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
            </motion.div>
            {isModalOpen && <CreateCharacterModal closeModal={closeModal} />}
        </div>
    );
}