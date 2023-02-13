import { WorkstreamsByUserFragmentFragment } from "../../../.graphclient";
import { useConstants } from "../../../utils/constants";
import AssignFuxModal from "../AssignFuxModal";
import ContributorModal from "../ContributorModal";
import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Button,
  GridItem,
  IconButton,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import NextLink from "next/link";
import React from "react";

const WorkstreamRow: React.FC<{
  workstream: WorkstreamsByUserFragmentFragment;
  fuxAvailable?: BigNumber;
  showInactive: boolean;
}> = ({ workstream, fuxAvailable, showInactive }) => {
  const toast = useToast();
  const { nativeToken } = useConstants();

  const _workstream = showInactive
    ? workstream
    : workstream.resolved
    ? undefined
    : workstream;
  const workstreamID = BigNumber.from(_workstream?.id);

  const _fuxGiven = _workstream?.fuxGiven?.find((fux) => fux.balance);

  return _workstream ? (
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
            <Text mr={2}> {_workstream.name}</Text>
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
        <Text pr={"1em"}>{`${
          ethers.utils.formatEther(_workstream.funding || "0").toString() || 0
        } ${nativeToken}`}</Text>
      </GridItem>
      <GridItem
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        bg="#301A3A"
        colSpan={2}
      >
        <Text pr={"1em"}>{`${_fuxGiven ? _fuxGiven.balance : "0"} %`}</Text>
      </GridItem>
      {fuxAvailable ? (
        <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
          <AssignFuxModal
            workstreamID={workstreamID}
            fuxGiven={_fuxGiven?.balance}
            fuxAvailable={fuxAvailable}
          />
        </GridItem>
      ) : undefined}
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <ContributorModal
          workstreamID={workstreamID}
          workstreamName={_workstream.name || "N/A"}
          contributors={_workstream.contributors?.filter(
            (contributor) => contributor
          )}
        />
      </GridItem>
    </>
  ) : (
    <></>
  );
};

export { WorkstreamRow };
