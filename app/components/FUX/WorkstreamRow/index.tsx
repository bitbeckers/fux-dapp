import { useFuxBalance } from "../../../hooks/fux";
import {
  useCommitmentToWorkstreamByID,
  useGetWorkstreamByID,
} from "../../../hooks/workstream";
import AssignFuxModal from "../AssignFuxModal";
import ContributorModal from "../ContributorModal";
import {
  ArrowRightIcon,
  CheckIcon,
  PlusSquareIcon,
  SettingsIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { Checkbox, GridItem, IconButton, Radio, Text } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import NextLink from "next/link";
import React from "react";

const WorkstreamRow: React.FC<{ workstreamID: number }> = ({
  workstreamID,
}) => {
  const { address: user } = useWallet();
  const workstream = useGetWorkstreamByID(workstreamID);
  const commitment = useCommitmentToWorkstreamByID(workstreamID, user || "");
  const availableFux = useFuxBalance();

  console.log("ROW AVAILABLE FUX: ", availableFux);

  return (
    <>
      <GridItem display={"flex"} alignItems={"center"} bg="#301A3A" colSpan={7}>
        <Checkbox
          alignContent="center"
          pl={"1em"}
        >
          {workstream?.name}
        </Checkbox>
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
        <IconButton
          aria-label="toggle workstream visibility"
          icon={Math.random() > 0.5 ? <ViewIcon /> : <ViewOffIcon />}
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
  );
};

export { WorkstreamRow };
