import User from "../User";
import { Tr, Td, Stat } from "@chakra-ui/react";

export const ContributorRow: React.FC<{ address: `0x${string}` }> = ({
  address,
}) => {
  return (
    <Tr>
      <Td>
        <User address={address} direction="horizontal" displayAvatar={true} />
      </Td>
      <Td>
        <Stat>
        --%
          {/* committed % */}
        </Stat>
      </Td>
      <Td>
        <Stat>
        --%
        {/* vFUX % */}
        </Stat>
      </Td>
    </Tr>
  );
};
