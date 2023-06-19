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
import { BigNumberish } from "ethers";

export const Contributor: React.FC<{
  address: `0x${string}`;
  commitment: BigNumberish;
  coordinator?: boolean;
  direction?: "column" | "row";
}> = ({ address, commitment, coordinator = false, direction }) => {
  return (
    <Flex direction={direction}>
      <User address={address} direction="horizontal" displayAvatar={true} />
      <Spacer />
      <StatGroup>
        <Stat>
          <StatLabel>Committed</StatLabel>
          <StatNumber>{`${commitment || 0}%`}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>vFux</StatLabel>
          <StatNumber>--%</StatNumber>
        </Stat>
      </StatGroup>
      {coordinator ?? <StarIcon mr={"1em"} />}
    </Flex>
  );
};
