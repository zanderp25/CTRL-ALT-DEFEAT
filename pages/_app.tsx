import type { AppProps } from 'next/app';
import { Esteban, Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import '@/styles/globals.css';
import { NavBar } from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const esteban = Esteban({
  variable: '--font-esteban',
  subsets: ['latin'],
  weight: '400',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NavBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
}

export default MyApp;