import 'bootstrap/dist/css/bootstrap.min.css'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head';
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'National Parks',
  description: 'National Parks Management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head metadata={metadata}></Head>
      <body className={inter.className}>
        <div className="container-fluid">
          <div className="row bg-light border-bottom border-info">
            <div className="col text-center p-1 col-2">
              <Link className="nav-link active link-dark" aria-describedby='Home' alt='Home' aria-current="page" aria-label='Home' href="/parks">Home</Link>
            </div>
            <div className="col-9 text-center text-primary pt-1">
              <h3>National Parks</h3>
            </div>
            <div className="col-1 p-1">
            <Link className="navbar-brand" target="_blank" href="/parks" aria-label='Home'>
                <Image src="/images/US-NationalParkService-Logo.svg" width={40} height={40}  alt="National Parks" />
              </Link>
            </div>
          </div>
        {children}
      </div>
    </body>
  </html>
  )
}
