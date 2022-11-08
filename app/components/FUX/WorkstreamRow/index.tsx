import {
  FuxGivenFragmentFragment,
  UserWorkstreamFragmentFragment,
} from "../../../.graphclient";
import { useConstants } from "../../../utils/constants";
import AssignFuxModal from "../AssignFuxModal";
import ContributorModal from "../ContributorModal";
import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  GridItem,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import NextLink from "next/link";
import React from "react";

const WorkstreamRow: React.FC<{
  workstream: UserWorkstreamFragmentFragment;
  fuxGiven?: FuxGivenFragmentFragment;
  fuxAvailable?: number;
  showInactive: boolean;
}> = ({ workstream, fuxGiven, fuxAvailable, showInactive }) => {
  const toast = useToast();
  const { nativeToken } = useConstants();

  const _workstream = showInactive
    ? workstream.workstream
    : workstream.workstream.resolved
    ? undefined
    : workstream.workstream;
  const workstreamID = Number(_workstream?.id);

  const handleClick = () => {
    if (!fuxGiven) {
      toast({
        title: `Cannot evaluate without giving FUX`,
        status: "error",
      });
    }
  };

  return _workstream ? (
    <>
      <GridItem display={"flex"} alignItems={"center"} bg="#301A3A" colSpan={7}>
        <Checkbox alignContent="center" pl={"1em"}>
          {_workstream.name}
        </Checkbox>
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
        <Text pr={"1em"}>{`${fuxGiven ? fuxGiven.balance : "0"} %`}</Text>
      </GridItem>
      {fuxAvailable ? (
        <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
          <AssignFuxModal
            workstreamID={workstreamID}
            fuxGiven={fuxGiven?.balance}
            fuxAvailable={fuxAvailable}
          />
        </GridItem>
      ) : undefined}
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <ContributorModal
          workstreamID={workstreamID}
          contributors={
            _workstream.contributors
              ?.map((contributor) => contributor.user.id)
              .filter((out) => out) || []
          }
        />
      </GridItem>

      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        {fuxGiven ? (
          <NextLink
            href={{
              pathname: "/resolve/[workstreamID]",
              query: { workstreamID },
            }}
          >
            <IconButton
              onClick={handleClick}
              aria-label="resolve workstream"
              icon={<ArrowRightIcon />}
            />
          </NextLink>
        ) : (
          <IconButton
            onClick={handleClick}
            aria-label="resolve workstream"
            icon={<ArrowRightIcon />}
          />
        )}
      </GridItem>
    </>
  ) : (
    <></>
  );
};

export { WorkstreamRow };
