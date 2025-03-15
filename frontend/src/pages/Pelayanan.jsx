import React from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Pelayanan() {
    const services = [
        { name: "Pembuatan KTP", link: "https://forms.gle/example1" },
        { name: "Pembuatan Surat Pindah", link: "https://forms.gle/example2" },
        { name: "Pembuatan Akta Kelahiran", link: "https://forms.gle/example3" },
        { name: "Pembuatan Akta Kematian", link: "https://forms.gle/example4" },
        { name: "Pembuatan Kartu Keluarga", link: "https://forms.gle/example5" },
        { name: "Perubahan Data Kartu Keluarga", link: "https://forms.gle/example6" },
        { name: "Pembuatan Surat Keterangan Domisili", link: "https://forms.gle/example7" }
      ];

    
    return (
    <div className='flex flex-col bg-white items-center' style={{ fontFamily: "poppins" }}> 
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full max-w-5xl min-h-lvh pt-20 space-y-4 md:px-0 px-4">
            <h1 className="text-[3rem] md:text-[7rem] font-extrabold md:font-black bg-gradient-to-b from-black to-gray-400 bg-clip-text text-transparent leading-none">
                Pusat <p>Pelayanan <p>Online Desa</p></p> 
            </h1>
            <div className="mt-6 md:mt-10 w-full space-y-6">
                {services.map((service, index) => (
                <a
                    key={index}
                    href={service.link}
                    target="_blank"
                rel="noopener noreferrer"
                    className="w-full flex justify-between items-center p-4 bg-white shadow-lg rounded-xl hover:bg-gray-200 transition"
                >
                <span className="text-lg font-medium">{service.name}</span>
                <span className="text-xl">↗</span>
                </a>
                ))}
            </div>
        </div>
        <Footer />
    </div>
  )
}
