'use client';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';



const inter = Inter({ subsets: ['latin'] })

const metadata = {
  title: 'National Parks',
  description: 'National Parks Management',
}

export default function RootLayout({ children }) {

  const router = useRouter();

  const [query, setQuery] = useState("");

  const updateQuery = ({ target }) => {
    // Update query onKeyPress of input box
    setQuery(target.value)
  }

  const keyPressed = ({ key }) => {
    // Capture search on Enter key
    if (key === "Enter") {
      if(query.length>0)
      {
        debugger;
        const redirectPath = `/parks?search=${query}`;
        setQuery('');
        router.push(redirectPath);
      }
    }
  }

  return (
    <html lang="en">
      <Head metadata></Head>
      <body className={inter.className} >
        <div className="container-fluid" data-cy-root>
          <div className="row bg-light border-bottom border-info">
            <div className="col text-center p-2 col-2">
              <Link className="nav-link active link-dark" aria-describedby='Home' alt='Home' aria-current="page" aria-label='Home' href="/parks">Home</Link>
            </div>
            <div className="col-6 text-center text-primary pt-1" role="heading">
              <h3>National Parks</h3>
            </div>
            <div className="col-3 p-1">
            <input type="text" 
                    className="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder="Search & hit Enter" 
                    onChange={updateQuery} 
                    onKeyDown={keyPressed} value={query}/>
            </div>
            <div className="col-1 p-1">
            <Link className="navbar-brand float-left" href="/parks" aria-label='Home'>
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
