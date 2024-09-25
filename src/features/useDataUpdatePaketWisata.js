import { useMutation, useQueryClient } from 'react-query';
import { axiosBaseUrl } from './../components/lib/axios';

export const useDataUpdatePaketWisata = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ id, body }) => {
      const response = await axiosBaseUrl.patch(`paket-wisata/${id}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dataPaketWisataById');
      },
    }
  );

  return mutation; // Mengembalikan objek mutasi
};
