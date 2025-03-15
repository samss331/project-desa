import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import riceField from '../assets/rice-field-7890204_1920.jpg';

const data = [
  {
    title: 'Statistik Penduduk',
    location: 'Desa Desaku',
    city: 'Kota, Indonesia',
    image: '/assets/jmlh.jpg',
  },
  {
    title: 'Wilayah Daerah',
    location: 'Desa Desaku',
    city: 'Kota, Indonesia',
    image: '/assets/map.png',
  },
  {
    title: 'Statistik Penduduk',
    location: 'Desa Desaku',
    city: 'Kota, Indonesia',
    image: '/assets/jmlh.jpg',
  },
];

const cardData = [
  { src: 'assets/map.png', alt: 'map', text: 'PETA DESA' },
  { src: 'assets/profit.png', alt: 'profit', text: 'APBD' },
  { src: 'assets/building.png', alt: 'building', text: 'FASILITAS' },
  { src: 'assets/megaphone.png', alt: 'megaphone', text: 'PENGUMUMAN' },
  { src: 'assets/grocery-store.png', alt: 'grocery store', text: 'UMKM DESA' },
  { src: 'assets/location.png', alt: 'location', text: 'WISATA DESA' }
];

const Card = ({ src, alt, text }) => (
  <div className="flex flex-col justify-center items-center w-28 h-28 bg-white p-2 rounded-lg cursor-pointer text-black">
    <img src={src} alt={alt} className="w-10 mb-2" />
    <p className="text-[12px]">{text}</p>
  </div>
);

const newsData = [
  {
    title: "Lorem ipsum dolor sit amet.",
    link: "https://desadalung.badungkab.go.id/-Berita%20Desa/57405-umkm-arummanis-di-desa-cibodas-dari-produksi-rumah-tangga-hingga-pasar-nasional",
    description: "DESAKU (01/02/2025) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis velit et leo tincidunt commodo...",
    source: "Berita.com",
    date: "Feb 01, 2025",
    image: {riceField},
    logo: "/assets/download.png",
    bookmark: "/assets/bookmark.png",
  },
  // Tambahkan data berita lainnya di sini
];

const NewsCard = ({ news }) => (
  <div className="flex-1 flex h-1/3 bg-white p-2 rounded-lg shadow-md">
    <img src={news.image} alt="berita" className="h-full rounded-lg" />
    <div className="justify-center align-center w-full ml-4">
      <h3 className="text-lg font-semibold md:text-base">{news.title}</h3>
      <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-xs">
        {news.description}
      </a>
      <div className="flex w-full justify-between items-center mt-1 bg-gray-100 p-2 rounded-lg">
        <div className="flex items-center space-x-2">
          <img src={news.logo} alt="berita" className="w-10 h-10 rounded-md" />
          <div>
            <h5>{news.source}</h5>
            <p className="text-xs text-gray-400">{news.date}</p>
          </div>
        </div>
        <img src={news.bookmark} alt="bookmark" className="w-6 h-6" />
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[35rem] md:h-[50rem]"
        style={{ backgroundImage: `url(${riceField})` }}
      >
        <div
          className="absolute inset-0 bg-black/70 md:bg-black/30 flex flex-col justify-center items-center text-white text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold">WEBSITE PEMERINTAH DESA DESAKU</h2>
          <p className="text-md md:text-lg">KEC. KECAMATAN KAB. KABUPATEN</p>
          <div
            className="flex justify-center items-center mt-10 md:mt-6 bg-transparent md:bg-white p-2 rounded-[25rem] border-2 border-white"
          >
            <input
              type="text"
              className="w-[16rem] md:w-[18rem] bg-transparent"
              placeholder="Cari...."
            />
            <img
              src="assets/search-interface-symbol.png"
              alt="search"
              className="w-6 p-1 cursor-pointer hidden md:flex"
            />
            <img
              src="assets/loupe.png"
              alt="search"
              className="w-6 p-1 cursor-pointer md:hidden"
            />
          </div>
          <div id="cardContainer" className="grid grid-cols-3 gap-4 w-[22rem] place-items-center mt-16 md:mt-28 md:flex md:flex-row justify-center md:w-full">
            {cardData.map((card, index) => (
              <Card key={index} src={card.src} alt={card.alt} text={card.text} />
            ))}
          </div>
        </div>
      </section> 

      {/* Informasi Desa */}
      <InformasiDesa />

      {/* Serba Serbi Desa */}
      <SerbaSerbi />

      {/* Informasi Terbaru */}
      <Informasi />

      {/* Berita Baru */}
      <BeritaBaru />

      <Footer />
    </div>
  );

  function InformasiDesa(){
    return(
      <section className="container mx-auto my-0 px-0 md:my-10 md:px-6">
        <div className="block md:flex w-full bg-white rounded-lg shadow-none md:shadow-md">
          <div className="hidden p-6 w-[50rem] flex-row items-center gap-6 border-black border-r-2 md:flex">
            <img
              src="assets/rice-field-7890204_1920.jpg"
              alt=""
              className="hidden w-32 h-32 rounded-full md:flex"
            />
            <div>
              <h3 className="text-xl font-semibold">Informasi Terbaru</h3>
              <p className="text-gray-600 mt-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
                quam impedit dignissimos quaerat laborum animi consequatur quidem
                assumenda porro? Tempora quibusdam, eius omnis cum voluptas
                reprehenderit, placeat illum molestias architecto nihil voluptate
                sapiente distinctio quas dolor iste nostrum. Consequuntur, rerum?
              </p>
            </div>
          </div>
          {/* Statistik Desa */}
          <div className="p-6 flex-col flex text-center mx-auto gap-y-2">
            <div>
              <h3 className="text-xl font-semibold">Statistik Penduduk Desa</h3>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col items-center">
                <img src="assets/dad.png" alt="" className="w-16 h-16 rounded-full" />
                <h2>0000 <br />Kepala Keluarga</h2>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="assets/male-gender.png"
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <h2>0000 <br />Laki-laki</h2>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="assets/femenine.png"
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <h2>0000 <br />Perempuan</h2>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="assets/group.png"
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <h2>0000 <br />Jumlah Penduduk</h2>
              </div>
            </div>
          </div>
          <div className="block md:hidden bg-gray-100 text-2xl text-center">
            <div className="px-16 pt-4">
              <h3 className="font-bold">Informasi Desa</h3>
              <p className="h-32 overflow-y-hidden">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio fuga
                quisquam iusto nihil sequi, libero perspiciatis quia quae vel
                nesciunt dolores aliquam! Iusto autem laboriosam pariatur explicabo
                in ea harum tempora itaque, beatae exercitationem! Sequi aliquam,
                magni fuga harum non repellat dolorem doloremque rerum quas deserunt
                explicabo. Nisi, odit numquam.
              </p>
            </div>
            <img src="assets/kantor.png" alt="" className="px-6 py-8" />
          </div>
        </div>
      </section>
    )
  }

  function SerbaSerbi(){
    <section className="mx-auto my-10 px-6">
    <div className="flex w-full flex-col bg-white rounded-lg shadow-none md:shadow-md overflow-x-auto md:overflow-visible">
      <div className="hidden text-center mb-8 mt-4 md:block">
        <h1 className="font-bold text-3xl">Serba Serbi Desa Desaku</h1>
        <h3 className="text-lg">Kenali Desaku Lebih Dekat</h3>
        <h4 className="px-32">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio fuga quisquam iusto nihil sequi, libero perspiciatis
          quia quae vel nesciunt dolores aliquam! Iusto autem laboriosam pariatur explicabo in ea harum tempora itaque,
          beatae exercitationem! Sequi aliquam, magni fuga harum non repellat dolorem doloremque rerum quas deserunt
          explicabo. Nisi, odit numquam.
        </h4>
      </div>
      <div className="flex-row flex w-[60rem] space-x-4 md:space-x-0 md:w-full justify-between md:justify-evenly mb-4">
        {data.map((item, index) => (
          <div key={index} className="bg-[#1D2632] self-center rounded-lg pt-2 w-[20rem]">
            <span className="ml-6 px-2 text-[#16BE27] rounded-2xl font-semibold text-[0.9rem] bg-black bg-opacity-50">
              {item.title}
            </span>
            <h1 className="ml-4 mt-1 pl-2 text-[#16BE27] font-bold text-2xl">{item.location}</h1>
            <h2 className="ml-4 pl-2 mt-1 mb-3 text-[#16BE27] font-normal">{item.city}</h2>
            <img src={item.image} alt={item.title} className="w-[20rem] h-[15rem] shadow-md rounded-b-lg" />
          </div>
        ))}
      </div>
    </div>
  </section>
  }

  function Informasi(){
    return(
      <section className="w-[100%] px-6">
    <h3 className="text-[32px] font-bold">Informasi Terbaru</h3>
    <div className="flex gap-6 mt-2">
      <div className="col-span-2 h-[24rem] w-full md:w-3/5 relative shadow-lg">
        <img
          src={riceField}
          alt="Informasi Terbaru"
          className="rounded-md w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full bg-black/10 text-white h-1/4 rounded-b-lg p-4">
          <h4 className="text-2xl font-semibold">Lorem ipsum dolor sit amet</h4>
          <p className="text-gray-200">01 Februari 2025 · Desa Desaku</p>
        </div>
      </div>
      <div className="hidden md:block w-2/5 space-y-4 h-[24rem]">
        {[...Array(2)].map((_, index) => (
          <div key={index}>
            <div className="flex items-center space-x-4 bg-gray-100 pl-2 rounded-lg h-1/3 shadow-lg">
              <div className="rounded-md p-2">
                <h3 className="text-gray-900 font-bold text-[15px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis velit.
                </h3>
                <p>
                  DESAKU (01/02/2025) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis velit et leo tincidunt ...
                </p>
              </div>
              <div className="w-full h-full">
                <img
                  src={riceField}
                  alt="thumb"
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
    )
  }

  function BeritaBaru(){
    return(
      <section className="container mx-auto my-10 px-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Berita Baru</h3>
        <a id="list-berita" className="flex bg-white px-4 py-1 rounded-lg text-sm items-center hover:bg-red-500 hover:text-white">
          Show All
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" className="ml-2">
            <path d="M224,128a8,8,0,0,1-4.58,7.23l-152,72a8,8,0,1,1-6.85-14.46L197.31,128,60.58,63.23a8,8,0,1,1,6.85-14.46l152,72A8,8,0,0,1,224,128Z"></path>
          </svg>
        </a>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="w-1/2 space-y-4 h-[30rem] flex flex-col">
          {newsData.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
        <div className="w-1/2 space-y-4 h-[30rem] flex flex-col">
          {newsData.map((news, index) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
      </div>
    </section>
    )
  }
}