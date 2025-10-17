import customAxios from "@/services/axios";
import { useMutation } from "@tanstack/react-query";

interface MutationProps {
  url: string;
  payload?: any;
  config?: any;
}

export const usePostQuery = (mutationKey: string[]) => {
  return useMutation({
    mutationKey,
    mutationFn: async (props: MutationProps) => {
      const { data } = await customAxios.post(
        props.url,
        props.payload,
        props.config
      );
      return data;
    },
  });
};

export const usePutQuery = (mutationKey: string[]) => {
  return useMutation({
    mutationKey,
    mutationFn: async (props: MutationProps) => {
      const { data } = await customAxios.put(
        props.url,
        props.payload,
        props.config
      );
      return data;
    },
  });
};

export const useDeleteQuery = (mutationKey: string[]) => {
  return useMutation({
    mutationKey,
    mutationFn: async (props: MutationProps) => {
      const { data } = await customAxios.delete(props.url, props.payload);
      return data;
    },
  });
};
export const usePatchQuery = (mutationKey: string[]) => {
  return useMutation({
    mutationKey,
    mutationFn: async (props: MutationProps) => {
      const { data } = await customAxios.patch(
        props.url,
        props.payload,
        props.config
      );
      return data;
    },
  });
};
