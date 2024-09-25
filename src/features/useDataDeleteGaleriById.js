import { useMutation, useQueryClient } from 'react-query';
import { axiosBaseUrl } from './../components/lib/axios';

export const useDataDeleteGaleriById = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ id, fileName }) => {
      console.log(typeof id)
      const response = await axiosBaseUrl.delete(`galeri/${id}/file/${fileName}`, {
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
