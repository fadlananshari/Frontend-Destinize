import { useMutation, useQueryClient } from 'react-query';
import { axiosBaseUrl } from './../components/lib/axios';

export const useDataCreatePaketWisata = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ body }) => {
      const response = await axiosBaseUrl.post(`paket-wisata`, body, {
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
