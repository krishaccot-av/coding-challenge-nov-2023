import 'bootstrap/dist/css/bootstrap.min.css'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'National Parks',
  description: 'National Parks',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container-fluid">
          <div className="row bg-light border-bottom border-info">
            <div className="col text-center p-1 col-2">
              <Link className="nav-link active link-dark" aria-describedby='Home' alt='Home' aria-current="page" aria-label='Home' href="/parks">Home</Link>
            </div>
            <div className="col-9 text-center">
              <h3>National Parks</h3>
            </div>
            <div className="col-1 p-1">
            <Link className="navbar-brand" target="_blank" href="/parks" aria-label='Home'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/1d/US-NationalParkService-Logo.svg" width={"40px"} height={"40px"}  alt="National Parks" />
              </Link>
            </div>
          </div>
        {children}
      </div>
    </body>
  </html>
  )
}
