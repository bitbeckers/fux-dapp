import {
  useCommitmentToWorkstreamByID,
  useGetWorkstreamByID,
} from "../../../hooks/workstream";
import {
  ArrowRightIcon,
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
  console.log("Generating ROW: ", workstreamID);
  const { address: user } = useWallet();
  const workstream = useGetWorkstreamByID(workstreamID);
  const commitment = useCommitmentToWorkstreamByID(workstreamID, user || "");

  return (
    <>
      <GridItem display={"flex"} alignItems={"center"} bg="#301A3A" colSpan={7}>
        <Checkbox
          alignContent="center"
          pl={"1em"}
          isDisabled={commitment?.gt(0)}
          isInvalid={commitment?.gt(0)}
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
        <IconButton
          aria-label="toggle workstream visibility"
          icon={Math.random() > 0.5 ? <ViewIcon /> : <ViewOffIcon />}
        />
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <IconButton aria-label="add contributor" icon={<PlusSquareIcon />} />
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <IconButton aria-label="edit workstream" icon={<SettingsIcon />} />
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
