import { HStack, Avatar, Text } from "@chakra-ui/react";
import { useENS, formatAddress } from "@raidguild/quiver";

export const ContributorRow: React.FC<{ address: string }> = ({ address }) => {
  const { ens, avatar, loading } = useENS({ address: address ?? "" });

  const addressString = formatAddress(address);

  return (
    <HStack>
      <Avatar name={ens} src={avatar && !loading ? avatar : ""} />
      <Text>
        {ens && !loading ? ens : addressString ? addressString : "Loading"}
      </Text>
    </HStack>
  );
};
