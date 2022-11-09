import { WorkstreamsByUserFragmentFragment } from "../../../.graphclient";
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
  workstream: WorkstreamsByUserFragmentFragment;
  fuxAvailable?: number;
  showInactive: boolean;
}> = ({ workstream, fuxAvailable, showInactive }) => {
  const toast = useToast();
  const { nativeToken } = useConstants();

  const _workstream = showInactive
    ? workstream
    : workstream.resolved
    ? undefined
    : workstream;
  const workstreamID = Number(_workstream?.id);

  const _fuxGiven = _workstream?.fuxGiven?.find((fux) => fux.balance);

  const allowResolve = Number(_fuxGiven?.balance) !== 0;

  const handleClick = () => {
    if (!allowResolve) {
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
          contributors={_workstream.contributors?.filter(
            (contributor) => contributor
          )}
        />
      </GridItem>

      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        {allowResolve ? (
          <NextLink
            href={{
              pathname: "/resolve/[workstreamID]",
              query: { workstreamID },
            }}
          >
            <IconButton
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
