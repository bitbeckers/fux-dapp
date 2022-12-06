import { HStack, Avatar, Text, Button, useToast } from "@chakra-ui/react";
import { formatAddress, useENS } from "@raidguild/quiver";

export const ContributorRow: React.FC<{ address: string }> = ({ address }) => {
  const { address: _address, ens, avatar } = useENS({ address });
  const toast = useToast();

  const handleClick = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: `Copied address to clipboard`,
      status: "success",
    });
  };

  return ens ? (
    <HStack>
      <Avatar name={ens} src={avatar} />
      <Button variant={"link"} onClick={() => handleClick()}>
        <Text>{ens}</Text>
      </Button>
    </HStack>
  ) : (
    <HStack>
      <Avatar name={address} src={avatar} />
      <Button variant={"link"} onClick={() => handleClick()}>
        <Text>{formatAddress(address)}</Text>
      </Button>
    </HStack>
  );
};
