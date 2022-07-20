import { SettingsIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { GridItem, IconButton, Radio, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const WorkstreamRow: React.FC<{ workstream: Partial<Workstream> }> = ({
  workstream,
}) => {
  return (
    <>
      <GridItem display={"flex"} alignItems={"center"} bg="#301A3A" colSpan={6}>
        <Radio alignContent="center" pl={"1em"}>
          {workstream?.name}
        </Radio>
      </GridItem>
      <GridItem
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        bg="#301A3A"
        colSpan={2}
      >
        <Text pr={"1em"}>{`${workstream?.allocation || 0} %`}</Text>
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <IconButton
          aria-label="edit workstream"
          icon={workstream.publiclyVisible ? <ViewIcon /> : <ViewOffIcon />}
        />
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <IconButton aria-label="edit workstream" icon={<SettingsIcon />} />
      </GridItem>
    </>
  );
};

export { WorkstreamRow };
