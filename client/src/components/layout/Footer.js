import React from 'react'   // rfc

export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 p-3 text-center">
            Copyright &copy; {new Date().getFullYear()} DevHub
        </footer>
    )
}
