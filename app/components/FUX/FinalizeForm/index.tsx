import { Workstream, WorkstreamContributor } from "../../../.graphclient";
import { useCustomToasts } from "../../../hooks/toast";
import { contractAddresses, contractABI } from "../../../utils/constants";
import User from "../User";
import { StarIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Grid,
  GridItem,
  Text,
  VStack,
  Stat,
  StatNumber,
} from "@chakra-ui/react";
import { BigNumberish } from "ethers";
import _ from "lodash";
import React, { Fragment } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

type Ratings = {
  [address: string]: BigNumberish;
};

const parseEvaluations = (workstream: Workstream) => {
  let data: Ratings = {};
  const currentEvaluations = workstream?.evaluations;

  return data;
};

const FinalizeForm: React.FC<{
  workstream: Partial<WorkstreamContributor>;
}> = ({ workstream }) => {
  const toast = useCustomToasts();

  const _workstream = workstream as Workstream;

  const averages = parseEvaluations(_workstream);

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "finalizeWorkstream",
    args: [workstream.id, Object.keys(averages), Object.values(averages)],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      toast.error(e);
    },
    onSuccess(data) {
      toast.success(
        "Finalizing workstream",
        "Returning FUX and paying out rewards"
      );
      console.log(data);
    },
  });

  const _contributors = Object.keys(averages);
  const _ratings = Object.values(averages).map((rating) => +rating.toString());
  const total = _ratings.length > 0 ? _ratings.reduce((a, b) => a + b, 0) : 0;

  const onSubmit = () => {
    if (total != 100) {
      toast.warning(`Not enough FUX`, `${total || "..."}/100`);
      return;
    }

    if (_contributors.length !== _ratings.length) {
      toast.warning(
        `Contributor <> Evaluation mismatch`,
        `Did you evaluate everybody?`
      );
      return;
    }

    console.log("WRITING");
    write?.();
  };

  console.log("Workstream: ", workstream);

  const contributors = _workstream.contributors;
  const coordinator = _workstream.coordinator?.id;

  console.log("Contributors: ", contributors);

  const finalizeForm =
    contributors && contributors?.length > 0 ? (
      <>
        <Grid gap={2} templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={5}>
            <Text>User</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text>Committed</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text>vFUX</Text>
          </GridItem>
          <GridItem colSpan={1}>
            <Text>Coordinator</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text>Funds</Text>
          </GridItem>
          {contributors.map((contributor, index) => {
            const address = contributor.contributor.id as `0x${string}`;
            return (
              <Fragment key={index}>
                <GridItem colSpan={5}>
                  <User
                    address={address as `0x${string}`}
                    direction="horizontal"
                    displayAvatar={true}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Stat>
                    <StatNumber>{`${contributor.commitment || 0}%`}</StatNumber>
                  </Stat>
                </GridItem>
                <GridItem colSpan={2}>
                  <Stat>
                    <StatNumber>--%</StatNumber>
                  </Stat>
                </GridItem>
                <GridItem colSpan={1}>
                  {coordinator?.toLowerCase() === address.toLowerCase() ? (
                    <StarIcon mr={"1em"} />
                  ) : undefined}
                </GridItem>
                <GridItem bg="#301A3A" display={"inline-grid"} colSpan={2}>
                  Loot
                </GridItem>
              </Fragment>
            );
          })}
        </Grid>

        <Button
          isDisabled={total != 100}
          isLoading={isLoading}
          type="submit"
          onClick={onSubmit}
        >
          Finalize workstream
        </Button>
      </>
    ) : (
      <Text>No contributors found</Text>
    );

  return finalizeForm;
};

export { FinalizeForm };
