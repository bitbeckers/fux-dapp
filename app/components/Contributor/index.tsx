import User from "../User";
import { StarIcon } from "@chakra-ui/icons";
import {
  Stat,
  Flex,
  Spacer,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

export const Contributor: React.FC<{
  address: `0x${string}`;
  commitment: bigint;
  coordinator?: boolean;
  direction?: "column" | "row";
}> = ({ address, commitment = 0n, coordinator = false, direction }) => {
  return (
    <Flex direction={direction}>
      <User address={address} direction="horizontal" displayAvatar={true} />
      <Spacer />
      <StatGroup>
        <Stat>
          <StatLabel>Committed</StatLabel>
          <StatNumber>{`${commitment.toString()} %`}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>vFux</StatLabel>
          <StatNumber>--%</StatNumber>
        </Stat>
      </StatGroup>
      {coordinator ?? <StarIcon mr={"1em"} color={"yellow"} />}
    </Flex>
  );
};
