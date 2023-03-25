import { CopyIcon } from "@chakra-ui/icons";
import {
  HStack,
  Avatar,
  Text,
  Button,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useEnsAvatar, useEnsName } from "wagmi";

const User: React.FC<{
  address: `0x${string}`;
  direction?: "horizontal" | "vertical";
  displayAvatar?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}> = ({ address, direction, displayAvatar, size }) => {
  const {
    data: name,
    isError: nameError,
    isLoading: nameLoading,
  } = useEnsName({
    address,
    chainId: 1,
  });
  const {
    data: _avatar,
    isError: avatarError,
    isLoading: avatarLoading,
  } = useEnsAvatar({
    address,
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

  let component = <></>;

  if (direction === "vertical") {
    component = (
      <VStack>
        {displayAvatar ? <Avatar name={address} src={avatar} /> : undefined}
        <Button variant={"link"} size={_size} onClick={() => handleClick()}>
          <Text mr={2}>{name ? name : `${address.slice(0, 6)}...`}</Text>{" "}
          <CopyIcon />
        </Button>
      </VStack>
    );
  }

  if (!direction || direction === "horizontal") {
    component = (
      <HStack>
        {displayAvatar ? <Avatar name={address} src={avatar} /> : undefined}
        <Button variant={"link"} size={_size} onClick={() => handleClick()}>
          <Text mr={2} size={size}>
            {name ? name : `${address.slice(0, 6)}...`}
          </Text>{" "}
          <CopyIcon />
        </Button>
      </HStack>
    );
  }

  return component;
};

export default User;
