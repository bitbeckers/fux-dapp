import { Workstream } from "../../.graphclient";
import { useConstants } from "../../utils/constants";
import CommitFuxModal from "../CommitFuxModal";
import ContributorModal from "../ContributorModal";
import { StarIcon } from "@chakra-ui/icons";
import { Button, Flex, GridItem, Icon, Text } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import NextLink from "next/link";
import React from "react";
import { useAccount } from "wagmi";

const WorkstreamRow: React.FC<{
  workstream: Partial<Workstream>;
  fuxAvailable?: BigNumber;
  showInactive: boolean;
}> = ({ workstream, fuxAvailable, showInactive }) => {
  const { address: user } = useAccount();
  const { nativeToken } = useConstants();

  if (!workstream) {
    return null;
  }

  if (showInactive && workstream?.status === "Closed") {
    return null;
  }

  const contributor = workstream.contributors?.find(
    (cont) => cont.contributor.id.toLowerCase() === user?.toLowerCase()
  );

  const commitment = contributor?.commitment ?? 0;

  const coordinator = workstream?.coordinator?.id;

  return (
    <>
      <GridItem
        display={"flex"}
        alignItems={"center"}
        bg="#301A3A"
        colSpan={7}
        pl={5}
      >
        <NextLink
          href={{
            pathname: `/workstream/${workstream.id}`,
          }}
        >
          <Button variant={"link"}>
            <Flex direction="row">
              <Text mr={2} noOfLines={1} color={"white"}>
                {workstream.name}
              </Text>
              {coordinator?.toLowerCase() === user?.toLowerCase() ? (
                <StarIcon color={"yellow"} />
              ) : undefined}
            </Flex>
          </Button>
        </NextLink>
      </GridItem>
      <GridItem
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        bg="#301A3A"
        colSpan={4}
      >
        {workstream?.funding && workstream.funding.length > 0 ? (
          <Text fontFamily="mono" pr={"1em"}>
            {`${ethers.utils.formatUnits(
              workstream.funding[0].amount,
              workstream.funding[0].token.decimals
            )} ${
              workstream.funding[0].token.symbol?.toLowerCase() === "native"
                ? nativeToken.symbol
                : workstream.funding[0].token.symbol
            }`}
          </Text>
        ) : undefined}
      </GridItem>
      <GridItem
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        bg="#301A3A"
        colSpan={2}
      >
        <Text fontFamily="mono" pr={"1em"}>{`${commitment} %`}</Text>
      </GridItem>
      {fuxAvailable ? (
        <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
          <CommitFuxModal
            workstreamID={BigNumber.from(workstream.id)}
            fuxGiven={BigNumber.from(commitment)}
            fuxAvailable={fuxAvailable}
            tiny={true}
          />
        </GridItem>
      ) : undefined}
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <ContributorModal
          workstreamID={BigNumber.from(workstream.id)}
          workstreamName={workstream.name || ""}
          contributors={workstream.contributors ?? []}
        />
      </GridItem>
    </>
  );
};

export { WorkstreamRow };
