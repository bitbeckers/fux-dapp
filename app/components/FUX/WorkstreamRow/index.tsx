import { Workstream, WorkstreamContributor } from "../../../.graphclient";
import { useConstants } from "../../../utils/constants";
import CommitFuxModal from "../CommitFuxModal";
import ContributorModal from "../ContributorModal";
import { Button, GridItem, Text } from "@chakra-ui/react";
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
            <Text mr={2} noOfLines={1}>
              {workstream.name}
            </Text>
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
        <Text fontFamily="mono" pr={"1em"}>{`${
          ethers.utils.formatEther(workstream.funding).toString() || 0
        } ${nativeToken}`}</Text>
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
