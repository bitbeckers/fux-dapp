import { TokenFragmentFragment } from "../../__generated__/gql/graphql";
import { useGraphClient } from "../../hooks/useGraphClient";
import { contractAddresses, contractABI } from "../../utils/constants";
import { decodeURI, shortenString } from "../../utils/helpers";
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
  useDisclosure,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEnsAvatar, useEnsName, useContractRead } from "wagmi";

const User: React.FC<{
  address: `0x${string}`;
  direction?: "horizontal" | "vertical";
  displayAvatar?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}> = ({ address, direction, displayAvatar, size }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { balancesByUser } = useGraphClient();
  const { data: ensName } = useEnsName({
    address,
    scopeKey: "wagmi",
    chainId: 1,
  });

  const {
    data: _avatar,
    isError: avatarError,
    isLoading: avatarLoading,
  } = useEnsAvatar({
    name: ensName,
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

  const { data: _balancesByUser } = useQuery({
    queryKey: ["balancesByUser", address?.toLowerCase()],
    queryFn: () => balancesByUser(address?.toLowerCase()),
    refetchInterval: 5000,
  });

  const fuxID = _balancesByUser?.userBalances.find(
    ({ token }: { token: TokenFragmentFragment }) => parseInt(token.tokenID) > 1
  )?.token.tokenID;

  const { data: tokenUri } = useContractRead({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "uri",
    args: [parseInt(fuxID)],
    watch: true,
  });

  const tokenLink = tokenUri ? decodeURI(tokenUri as string) : undefined;

  let component = <></>;

  if (direction === "vertical") {
    component = (
      <VStack>
        {displayAvatar ? (
          <Avatar
            name={address}
            src={avatar}
            onClick={onOpen}
            _hover={{ cursor: "pointer" }}
          />
        ) : undefined}
        <Flex direction="row">
          <Link href={{ pathname: "/profile", query: { account: address } }}>
            {ensName ? (
              <Tooltip label={address}>
                <Text mr={2} color={"white"}>
                  {ensName}
                </Text>
              </Tooltip>
            ) : (
              <Text mr={2} color={"white"}>{`${address.slice(0, 6)}...`}</Text>
            )}
          </Link>
          <Button variant={"link"} size={_size} onClick={() => handleClick()}>
            <CopyIcon />
          </Button>
        </Flex>
      </VStack>
    );
  }

  if (!direction || direction === "horizontal") {
    component = (
      <HStack>
        {displayAvatar ? (
          <Avatar
            name={address}
            src={avatar}
            onClick={onOpen}
            _hover={{ cursor: "pointer" }}
          />
        ) : undefined}
        <Flex direction="row">
          <Link
            href={{
              pathname: "/profile/[account]",
              query: { account: address },
            }}
          >
            {ensName ? (
              <Tooltip label={address}>
                <Text mr={2} color={"white"}>
                  {ensName}
                </Text>
              </Tooltip>
            ) : (
              <Text mr={2} color={"white"}>{`${address.slice(0, 6)}...`}</Text>
            )}
          </Link>
          <Button variant={"link"} size={_size} onClick={() => handleClick()}>
            <CopyIcon />
          </Button>
        </Flex>
      </HStack>
    );
  }

  return (
    <>
      {component}
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        size={"xs"}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {shortenString(address, 15)}
          </ModalHeader>
          <ModalBody display="flex" justifyContent="center" alignItems="center">
            {tokenLink !== undefined ? (
              <iframe
                src={"https://ipfs.io/ipfs" + tokenLink}
                width="286.5px"
                height="415px"
                frameBorder="0"
                scrolling="no"
                style={{ borderRadius: "20px" }}
              ></iframe>
            ) : (
              <Text>Loading</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default User;
