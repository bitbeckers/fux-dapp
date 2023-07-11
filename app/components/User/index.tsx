import { CopyIcon } from "@chakra-ui/icons";
import {
  HStack,
  Avatar,
  Text,
  Button,
  useToast,
  VStack,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useEnsAvatar, useEnsName, useContractRead } from "wagmi";
import { useGraphClient } from "/home/mikey/raid-guild/fux-dapp/app/hooks/useGraphClient.ts";
import { decodeURI } from "/home/mikey/raid-guild/fux-dapp/app/utils/helpers.ts";
import { contractAddresses, contractABI } from "/home/mikey/raid-guild/fux-dapp/app/utils/constants.ts";
import { useQuery } from "@tanstack/react-query";

const User: React.FC<{
  address: `0x${string}`;
  direction?: "horizontal" | "vertical";
  displayAvatar?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}> = ({ address, direction, displayAvatar, size }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sdk } = useGraphClient();
  const { data: ensName } = useEnsName({
    address,
    chainId: 1,
    scopeKey: "wagmi",
  });

  const {
    data: _avatar,
    isError: avatarError,
    isLoading: avatarLoading,
  } = useEnsAvatar({
    address,
    chainId: 1,
    scopeKey: "wagmi",
  });
  const [avatar, setAvatar] = useState<string>();
  const toast = useToast();
  const _size = size ? size : "md";

  useEffect(() => {
    if (!avatarLoading && !avatarError && _avatar) {
      setAvatar(_avatar);
    }
  }, [_avatar, avatarLoading, avatarError]);

  const handleClick = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: `Copied address to clipboard`,
      status: "success",
    });
  };

  const { data: balancesByUser } = useQuery({
    queryKey: ["balancesByUser", address?.toLowerCase()],
    queryFn: () => sdk.BalancesByUser({ address: address?.toLowerCase() }),
    refetchInterval: 5000,
  });

  const fuxID = balancesByUser?.userBalances.find(
    ({ token }) =>
      parseInt(token.tokenID) > 1
  )?.token.tokenID;

  const { data: tokenUri } = useContractRead({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "uri",
    args: [parseInt(fuxID)],
  });
  console.log("DATA", tokenUri);


  const tokenLink = tokenUri !== undefined ? decodeURI(tokenUri) : undefined;

  let component = <></>;

  if (direction === "vertical") {
    component = (
      <VStack>
        {displayAvatar ? <Avatar name={address} src={avatar} onClick={onOpen} _hover={{ cursor: 'pointer' }}/> : undefined}
        <Button variant={"link"} size={_size} onClick={() => handleClick()}>
          {ensName ? (
            <Tooltip label={address}>
              <Text mr={2}>{ensName}</Text>
            </Tooltip>
          ) : (
            <Text mr={2}>{`${address.slice(0, 6)}...`}</Text>
          )}
          <CopyIcon />
        </Button>
      </VStack>
    );
  }

  if (!direction || direction === "horizontal") {
    component = (
      <HStack>
        {displayAvatar ? <Avatar name={address} src={avatar} onClick={onOpen} _hover={{ cursor: 'pointer' }}/> : undefined}
        <Button variant={"link"} size={_size} onClick={() => handleClick()}>
          {ensName ? (
            <Tooltip label={address}>
              <Text mr={2}>{ensName}</Text>
            </Tooltip>
          ) : (
            <Text mr={2}>{`${address.slice(0, 6)}...`}</Text>
          )}
          <CopyIcon />
        </Button>
      </HStack>
    );
  }

  return (
    <>
    {component}
    <Modal blockScrollOnMount={false} isOpen={isOpen} size={"xl"} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{address}</ModalHeader>
        <ModalBody display="flex" justifyContent="center" alignItems="center">
        {tokenLink !== undefined ? 
            <iframe src={"https://ipfs.io/ipfs" + tokenLink} width="389px" height="561px" frameborder="0" scrolling="no"></iframe>
            :
            <Text>
              Loading
            </Text>
            
        }        
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
  )
};

export default User;
