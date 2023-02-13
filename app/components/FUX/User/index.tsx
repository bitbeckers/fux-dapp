import { CopyIcon } from "@chakra-ui/icons";
import {
  HStack,
  Avatar,
  Icon,
  Text,
  Tr,
  Td,
  Button,
  Stat,
  useToast,
  VStack,
  Box,
} from "@chakra-ui/react";
import { formatAddress, useENS } from "@raidguild/quiver";
import { useEffect, useState } from "react";

const User: React.FC<{
  address: string;
  direction?: "horizontal" | "vertical";
  avatar?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}> = ({ address, direction, avatar, size }) => {
  const {
    address: _address,
    ens,
    avatar: _avatar,
    loading,
  } = useENS({ address });
  const [displayName, setDisplayName] = useState<string>(address);
  const toast = useToast();
  const _size = size ? size : "md";

  useEffect(() => {
    if (!loading && !ens) {
      setDisplayName(formatAddress(address));
    }
    if (!loading && ens) {
      setDisplayName(ens);
    }
  }, [address, ens, loading]);

  const handleClick = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: `Copied address to clipboard`,
      status: "success",
    });
  };

  let component;

  if (direction === "vertical") {
    component = (
      <VStack>
        {avatar ? <Avatar name={address} src={_avatar} /> : undefined}
        <Button variant={"link"} size={_size} onClick={() => handleClick()}>
          <Text mr={2}>{displayName}</Text> <CopyIcon />
        </Button>
      </VStack>
    );
  }

  if (!direction || direction === "horizontal") {
    component = (
      <HStack>
        {avatar ? <Avatar name={address} src={_avatar} /> : undefined}
        <Button variant={"link"} size={_size} onClick={() => handleClick()}>
          <Text mr={2} size={size}>
            {displayName}
          </Text>{" "}
          <CopyIcon />
        </Button>
      </HStack>
    );
  }

  return component;
};

export default User;
