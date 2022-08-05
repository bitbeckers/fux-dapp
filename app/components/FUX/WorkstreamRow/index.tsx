import {
  ArrowRightIcon,
  SettingsIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { GridItem, IconButton, Radio, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const WorkstreamRow: React.FC<{ workstream: Partial<Workstream> }> = ({
  workstream,
}) => {
  return (
    <>
      <GridItem display={"flex"} alignItems={"center"} bg="#301A3A" colSpan={8}>
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
          aria-label="toggle workstream visibility"
          icon={workstream.publiclyVisible ? <ViewIcon /> : <ViewOffIcon />}
        />
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <IconButton
          aria-label="edit workstream"
          icon={<SettingsIcon />}
        />
      </GridItem>
      <GridItem display={"flex"} alignItems={"center"} colSpan={1}>
        <NextLink
          href={{
            pathname: "/resolve/[workstreamId]",
            query: { workstreamId: workstream.id },
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
