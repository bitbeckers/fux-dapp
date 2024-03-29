import { useToast } from "@chakra-ui/react";

export const useCustomToasts = () => {
  const toast = useToast();

  const success = (title: string, description: string) =>
    toast({
      title,
      status: "success",
      description,
      duration: 3000,
      isClosable: true,
    });

  const warning = (title: string, description: string) =>
    toast({
      title,
      status: "warning",
      description,
      duration: 5000,
      isClosable: true,
    });

  const error = (e: Error) => {
    toast({
      title: `Error: ${e.name}`,
      status: "error",
      duration: 5000,
      isClosable: true,
      description: e.message,
    });
    console.error(e);
  };
  return { success, warning, error };
};
