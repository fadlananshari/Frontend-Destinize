import { useMutation, useQueryClient } from 'react-query';
import { axiosBaseUrl } from './../components/lib/axios';

export const useDataDeletePaketWisata = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ id }) => {
      console.log(typeof id)
      const response = await axiosBaseUrl.delete(`paket-wisata/${id}`, {
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

  return mutation.mutate; // Pastikan ini mengembalikan mutate, bukan mutation
};
