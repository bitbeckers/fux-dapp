import eggplant from "../resources/eggplant.png";
import { apiTokens } from "../utils/constants";
import { useToast } from "@chakra-ui/react";
import { NFTStorage, Token } from "nft.storage";

const client = new NFTStorage({ token: apiTokens.nftStorage });

//TODO image upload

export const useCreateNFT = async (input: any) => {
  const toast = useToast();

  const res = await fetch("../resources/eggplant.png");
  if (!res.ok) {
    toast({
      title: `Error loading image`,
      status: "error",
      duration: 30000,
    });
    return undefined;
  }

  const imageFile = new File([await res.blob()], "image.png", {
    type: "image/png",
  });

  const metadata = await client.store({
    ...input,
    image: imageFile,
  });

  console.log("STORED!");
  console.log("Metadata: ", metadata.url);

  return metadata;
};
