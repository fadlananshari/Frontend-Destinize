import { useMutation, useQueryClient } from 'react-query';
import { axiosBaseUrl } from './../components/lib/axios';

export const useDataDeletePesanan = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ id }) => {
      const response = await axiosBaseUrl.delete(`reservasi/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dataReservasiById');
      },
    }
  );

  return mutation.mutate; // Pastikan ini mengembalikan mutate, bukan mutation
};
