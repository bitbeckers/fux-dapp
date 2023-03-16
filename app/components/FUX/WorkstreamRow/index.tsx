import { WorkstreamsByUserFragmentFragment } from "../../../.graphclient";
import { useConstants } from "../../../utils/constants";
import CommitFuxModal from "../CommitFuxModal";
import ContributorModal from "../ContributorModal";
import { Button, GridItem, Text } from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import NextLink from "next/link";
import React from "react";

const WorkstreamRow: React.FC<{
  workstream: WorkstreamsByUserFragmentFragment;
  fuxAvailable?: BigNumber;
  showInactive: boolean;
}> = ({ workstream, fuxAvailable, showInactive }) => {
  const { nativeToken } = useConstants();

  if (!workstream.id) {
    return null;
  }

  if (showInactive && workstream.resolved) {
    return null;
  }

  const workstreamID = workstream.id;

  const _fuxGiven =
    workstream?.fuxGiven?.find((fux) => fux.balance)?.balance || "0";

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
            pathname: "/workstream/[workstreamID]",
            query: { workstreamID },
          }}
        >
          <Button variant={"link"}>
            <Text mr={2} noOfLines={1}>
              {" "}
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
        <Text variant="mono" pr={"1em"}>{`${
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
        <Text pr={"1em"}>{`${_fuxGiven} %`}</Text>
      </GridItem>
      {fuxAvailable ? (
        <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
          <CommitFuxModal
            workstreamID={BigNumber.from(workstreamID)}
            fuxGiven={BigNumber.from(_fuxGiven)}
            fuxAvailable={fuxAvailable}
            tiny={true}
          />
        </GridItem>
      ) : undefined}
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <ContributorModal
          workstreamID={BigNumber.from(workstreamID)}
          workstreamName={workstream.name || ""}
          contributors={workstream.contributors?.filter(
            (contributor) => contributor
          )}
        />
      </GridItem>
    </>
  );
};

export { WorkstreamRow };
