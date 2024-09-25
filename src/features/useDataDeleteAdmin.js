import { useMutation, useQueryClient } from 'react-query';
import { axiosBaseUrl } from './../components/lib/axios';

export const useDataDeleteAdmin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async ({ id }) => {
      console.log(typeof id)
      const response = await axiosBaseUrl.delete(`admin/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('dataAdminById');
      },
    }
  );

  return mutation.mutate; // Pastikan ini mengembalikan mutate, bukan mutation
};
