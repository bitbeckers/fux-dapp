import { Workstream, WorkstreamContributor } from "../../../.graphclient";
import { useCustomToasts } from "../../../hooks/toast";
import {
  contractAddresses,
  contractABI,
  useConstants,
} from "../../../utils/constants";
import User from "../User";
import { StarIcon } from "@chakra-ui/icons";
import {
  Button,
  Grid,
  GridItem,
  Text,
  Stat,
  StatNumber,
  Flex,
} from "@chakra-ui/react";
import { BigNumberish, ethers } from "ethers";
import _, { groupBy, mapValues, meanBy } from "lodash";
import React, { Fragment } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

type Ratings = {
  [address: string]: BigNumberish;
};

const parseEvaluations = (workstream: Workstream) => {
  const currentEvaluations = groupBy(workstream?.evaluations, "contributor.id");

  return mapValues(currentEvaluations, (evaluation) =>
    meanBy(evaluation, (e) => Number(e.rating))
  ) as Ratings;
};

const roundToTarget = (ratings: Ratings, target: number) => {
  let l = Object.values(ratings) as number[];
  let off = target - _.reduce(l, (acc, x) => acc + Math.round(x), 0);
  let flat = Object.entries(ratings);

  let rounded = _.chain(flat)
    .sortBy((flat) => Math.round(Number(flat[1])) - Number(flat[1]))
    .map((x, i) => {
      let newX = x;
      newX[1] =
        Math.round(Number(x[1])) +
        (off > i ? 1 : 0) -
        (i >= l.length + off ? 1 : 0);
      return newX;
    })
    .value();

  return Object.fromEntries(rounded) as Ratings;
};

const calculateRelative = (data: Ratings) => {
  const total = _.sum(Object.values(data));

  const relative = mapValues(
    data,
    (value) => _.divide(Number(value), Number(total)) * 100
  );

  return roundToTarget(relative, 100);
};

const FinalizeForm: React.FC<{
  workstream: Partial<WorkstreamContributor>;
}> = ({ workstream }) => {
  const toast = useCustomToasts();
  const { nativeToken } = useConstants();

  const _workstream = workstream as Workstream;

  const averages = parseEvaluations(_workstream);
  const relative = calculateRelative(averages);

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "finalizeWorkstream",
    args: [
      workstream.id,
      Object.keys(relative) as `0x${string}`[],
      Object.values(relative),
    ],
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

  const _contributors = Object.keys(relative);
  const _ratings = Object.values(relative);
  const total = _.sum(Object.values(relative));

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

    write?.();
  };

  const contributors = _workstream.contributors;
  const coordinator = _workstream.coordinator?.id;
  const funding = ethers.utils.formatEther(_workstream.funding);

  const finalizeForm =
    contributors && contributors?.length > 0 ? (
      <>
        <Grid gap={2} templateColumns="repeat(16, 1fr)">
          <GridItem colSpan={8}>
            <Text>Contributor</Text>
          </GridItem>
          <GridItem colSpan={3}>
            <Text>Committed</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <Text>vFUX</Text>
          </GridItem>
          <GridItem colSpan={3}>
            <Text>Funds</Text>
          </GridItem>
          {contributors.map((contributor, index) => {
            const address = contributor.contributor.id as `0x${string}`;
            return (
              <Fragment key={index}>
                <GridItem colSpan={8}>
                  <Flex align={"center"}>
                    <User
                      address={address as `0x${string}`}
                      direction="horizontal"
                      displayAvatar={true}
                    />
                    {coordinator?.toLowerCase() === address.toLowerCase() ? (
                      <StarIcon ml={"1em"} />
                    ) : undefined}
                  </Flex>
                </GridItem>
                <GridItem colSpan={3}>
                  <Stat>
                    <StatNumber>{`${contributor.commitment || 0}%`}</StatNumber>
                  </Stat>
                </GridItem>
                <GridItem colSpan={2}>
                  <Stat>
                    <StatNumber>
                      {relative[address]?.toString() ?? "0"}
                    </StatNumber>
                  </Stat>
                </GridItem>
                <GridItem
                  bg="#301A3A"
                  display={"inline-grid"}
                  colSpan={3}
                  justifyContent="end"
                  alignContent="center"
                >
                  {relative[address]
                    ? `${_.multiply(
                        Number(funding),
                        relative[address] / 100
                      ).toFixed(4)} ${nativeToken}`
                    : `0 ${nativeToken}`}
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
