import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Header = () => {
    return (
        <div>
            <header className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link href='/' className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        {/* <Image src='/logo1.png' height='40' width='40' /> */}
                        <span className="ml-3 text-xl">ConvertKaro</span>
                    </Link>
                    <nav className="md:ml-auto font-normal text-gray-100 flex flex-wrap items-center text-base justify-center">
                        <Link href='/tabs/Docs' className="mr-5 hover:text-red-400	">Docs</Link>
                        <Link href='/tabs/About' className="mr-5 hover:text-cyan-400	">About Us</Link>
                        <Link href='/tabs/Testimonials' className="mr-5 hover:text-violet-500	">Testimonials</Link>
                        <Link href='/tabs/Contact' className="mr-5 hover:text-green-400	">Contact Us</Link>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Header