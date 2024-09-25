import { useMutation, useQueryClient } from 'react-query';
import { axiosBaseUrl } from './../components/lib/axios';

export const useDataUpdateStatusPesanan = () => {
  const queryClient = useQueryClient();
  const body = {};
  const mutation = useMutation(
    async ({ id }) => {
      const response = await axiosBaseUrl.patch(`reservasi/ubah-status/${id}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dataStatusPesananById');
      },
    }
  );

  return mutation; // Mengembalikan objek mutasi
};
