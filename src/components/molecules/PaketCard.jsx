const PaketCard = ({ id, nama, deskripsi, foto, lokasi }) => {
  return (
    // <div id={id} className="max-w-sm bg-white rounded-lg shadow hover:shadow-xl duration-500">
    //   <a href="#">
    //     <img className="rounded-t-lg w-72" src={`http://localhost:5000/assets/${foto}`} alt="" />
    //   </a>
    //   <div className="p-5">
    //     <a href="#">
    //       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{nama}</h5>
    //     </a>
    //     {/* <p>{lokasi}</p> */}
    //     {/* {deskripsi} */}
    //     {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{deskripsi}</p> */}
    //     <a
    //       href="#"
    //       className="inline-flex items-center text-sm font-medium text-center text-blue-400"
    //     >

    //       <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    //         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
    //       </svg>
    //     </a>
    //   </div>
    // </div>
    <a href={`paket-wisata/${id}`} className="relative bg-white rounded-lg shadow hover:shadow-lg md:hover:shadow-xl duration-500 overflow-hidden w-36 md:w-64 flex-shrink-0">
      <img src={`https://destinize-api-04aae1968d23.herokuapp.com/assets/${foto}`} alt={nama} className="w-full h-56 md:h-96 object-cover" />
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 md:rounded-tr bg-white bg-opacity-75 md:mr-24 z-10">
        <h2 className="font-bold text-sm md:text-base">{nama}</h2>
        <p className="text-slate-500 text-xs md:text-sm">{lokasi}</p>
      </div>
    </a>
  );
};

export default PaketCard;
