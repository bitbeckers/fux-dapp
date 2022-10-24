import { useFuxBalance } from "../../../hooks/fux";
import {
  useCommitmentToWorkstreamByID,
  useGetWorkstreamByID,
} from "../../../hooks/workstream";
import { useConstants } from "../../../utils/constants";
import AssignFuxModal from "../AssignFuxModal";
import ContributorModal from "../ContributorModal";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Checkbox, GridItem, IconButton, Radio, Text } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { ethers } from "ethers";
import NextLink from "next/link";
import React from "react";

const WorkstreamRow: React.FC<{
  workstreamID: number;
  showInactive: boolean;
}> = ({ workstreamID, showInactive }) => {
  const { address: user } = useWallet();
  const workstream = useGetWorkstreamByID(workstreamID);
  const commitment = useCommitmentToWorkstreamByID(workstreamID, user || "");
  const availableFux = useFuxBalance();
  const { nativeToken } = useConstants();

  console.log("ROW AVAILABLE FUX: ", availableFux);

  return showInactive || workstream?.exists ? (
    <>
      <GridItem display={"flex"} alignItems={"center"} bg="#301A3A" colSpan={7}>
        <Checkbox alignContent="center" pl={"1em"}>
          {workstream?.name}
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
          ethers.utils
            .formatEther(workstream?.funds.toString() || "0")
            .toString() || 0
        } ${nativeToken}`}</Text>
      </GridItem>
      <GridItem
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        bg="#301A3A"
        colSpan={2}
      >
        <Text pr={"1em"}>{`${commitment || 0} %`}</Text>
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <AssignFuxModal
          workstreamID={workstreamID}
          availableFux={availableFux?.toNumber() || 0}
        />
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <ContributorModal
          workstreamID={workstreamID}
          contributors={workstream?.contributors || []}
        />
      </GridItem>

      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
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
      </GridItem>
    </>
  ) : (
    <></>
  );
};

export { WorkstreamRow };
