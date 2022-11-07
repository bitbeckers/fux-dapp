import { HStack, Avatar, Text } from "@chakra-ui/react";
import { formatAddress, useENS } from "@raidguild/quiver";

export const ContributorRow: React.FC<{ address: string }> = ({ address }) => {
  const { address: _address, ens, avatar } = useENS({ address });

  return ens ? (
    <HStack>
      <Avatar name={ens} src={avatar} />
      <Text>{ens}</Text>
    </HStack>
  ) : (
    <HStack>
      <Avatar name={address} src={avatar} />
      <Text>{formatAddress(address)}</Text>
    </HStack>
  );
};
