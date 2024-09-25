import { useEffect, useState } from 'react';
import { useDataPesananByIdUser } from '../../features/useDataPesananByIdUser';
import Loading from '../pages/Loading';
import PesananCard from '../molecules/PesananCard';
// import { useDataPaketWisataById } from '../../features/useDataPaketWisataById';

const PesananCards = () => {
  const { dataPesanan, isLoading } = useDataPesananByIdUser();
  const [dataPesan, setDataPesan] = useState(null);

  useEffect(() => {
    if (!isLoading && dataPesanan) {
      setDataPesan(dataPesanan.data);
      //   const { dataPaketWisataById } = useDataPaketWisataById(dataPesanan.data);
      console.log(dataPesanan.data);
    }
  }, [isLoading, dataPesanan]);

  //   useEffect(() => {
  //     if (dataPesan) {
  //         data.map((data)=> {

  //         })
  //     }
  //   }, []);

  if (isLoading || dataPesan == null) {
    <Loading />;
  }

  return (
    <>
      {dataPesan == '' || dataPesan == null ? (
        <div className='py-40'>
          <p className='m-auto w-max text-gray-400'>Anda belum pernah melakukan reservasi</p>{' '}
        </div>
      ) : (
        <div className="mt-10 md:flex gap-5">{dataPesan && dataPesan.map((dataPesan, index) => <PesananCard data={dataPesan} key={index} />)}</div>
      )}
    </>
  );
};

export default PesananCards;
