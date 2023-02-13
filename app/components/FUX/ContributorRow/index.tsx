import User from "../User";
import { Tr, Td, Stat } from "@chakra-ui/react";

export const ContributorRow: React.FC<{ address: string }> = ({ address }) => {
  return (
    <Tr>
      <Td>
        <User address={address} direction="horizontal" avatar={true} />
      </Td>
      <Td>
        <Stat>11%</Stat>
      </Td>
      <Td>--</Td>
    </Tr>
  );
};
