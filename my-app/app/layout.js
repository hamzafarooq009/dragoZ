// app/layout.js
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { CharactersProvider } from './context/CharactersContext';
import Header from './components/Header';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <AuthProvider>
          <CharactersProvider>
            <Header />
            {children}
          </CharactersProvider>
        </AuthProvider>
      </body>
    </html>
  );
}