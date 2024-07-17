// app/layout.js
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <AuthProvider><body><Header/>{children}</body></AuthProvider>
    </html>
  );
}