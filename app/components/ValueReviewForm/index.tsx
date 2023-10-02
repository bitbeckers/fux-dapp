import { Workstream, WorkstreamContributor } from "../../.graphclient";
import { useBlockTx } from "../../hooks/useBlockTx";
import { useCustomToasts } from "../../hooks/useCustomToasts";
import { contractAddresses, contractABI } from "../../utils/constants";
import { CloseButton } from "../CloseButton";
import { ControlledNumberInput } from "../FormComponents/ControlledNumberInput";
import User from "../User";
import { StarIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Grid,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Text,
  ButtonGroup,
  VStack,
  Center,
  Flex,
  Stat,
  StatNumber,
} from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

type FormData = {
  ratings: {
    [address: `0x${string}`]: number;
  };
};

const findEvaluations = (evaluations: any, user: `0x${string}`) => {
  const currentEvaluations = evaluations?.filter(
    (evaluation: any) =>
      evaluation.creator.id.toLowerCase() === user.toLowerCase()
  );

  if (!currentEvaluations) {
    console.log("No current found");
    return {};
  }

  return _.transform(
    currentEvaluations,
    (result, v, _) => {
      result[v.contributor.id as `0x${string}`] = v.rating;
    },
    {} as { [address: `0x${string}`]: number }
  );
};

const ValueReviewForm: React.FC<{
  workstreamWithContributor: any;
}> = ({ workstreamWithContributor }) => {
  const router = useRouter();

  const { address: user } = useAccount();
  const toast = useCustomToasts();
  const { checkChain } = useBlockTx();

  const { evaluations, contributors, coordinator } = workstreamWithContributor;
  console.log({ workstreamWithContributor });

  const currentEvaluations = findEvaluations(
    evaluations,
    user || ("" as `0x${string}`)
  );

  const formMethods = useForm<FormData>({
    defaultValues: { ratings: { ...currentEvaluations } },
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = formMethods;

  const formData = watch();
  const ratings = watch("ratings");

  console.log({ formData, ratings });

  const _contributors = ratings ? Object.keys(ratings) : [];
  const _ratings = ratings
    ? Object.values(ratings).map((rating) => +rating)
    : [];
  const total = _ratings.length > 0 ? _ratings.reduce((a, b) => a + b, 0) : 0;

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "submitEvaluation",
    args: [workstreamWithContributor?.id, _contributors, _ratings],
  });

  console.log({ wsID: workstreamWithContributor?.id, _contributors, _ratings, config });

  const { write } = useContractWrite({
    ...config,
    onError(e) {
      toast.error(e);
    },
    onSuccess(data) {
      toast.success("Submitted Evaluation", "Evaluation submitted succesfully");
      console.log(data);
    },
    onSettled() {
      router.back();
    },
  });

  if (!user) {
    return <Text>Cannot determine user or contributors</Text>;
  }

  const onSubmit = (_: FormData) => {
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

    if (checkChain()) {
      toast.success(
        "Submitting evaluation",
        "Please validate and sign transaction"
      );
      console.log(write);
      write?.();
    }
  };

  const filterContributors = (contributors: WorkstreamContributor[]) => {
    return contributors.filter(
      (contributor) =>
        contributor.contributor.id.toLowerCase() !== user.toLowerCase()
    );
  };

  const filtered =
    contributors && contributors.length > 0
      ? filterContributors(contributors)
      : [];

  if (filtered.length === 0) {
    return (
      <Flex direction={"column"} gap={2}>
        <Text>No contributors found</Text>
        <CloseButton
          workstreamId={workstreamWithContributor?.id}
          disabled={false}
        />
      </Flex>
    );
  }

  const reviewForm = (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Text paddingBottom={"2em"} paddingTop={"2em"} textAlign={"center"}>
            Distribute 100 points to rate value contribution
          </Text>
        </Center>
        <FormControl>
          <Grid gap={2} templateColumns="repeat(12, 1fr)">
            <GridItem colSpan={8}>
              <Text>User</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text>Committed</Text>
            </GridItem>
            <GridItem colSpan={2}>
              <Text>Rating</Text>
            </GridItem>
            {filtered.map((contributor, index) => {
              const address = contributor.contributor.id as `0x${string}`;
              return (
                <Fragment key={index}>
                  <GridItem colSpan={8}>
                    <Flex direction={"row"} alignItems={"center"} gap={"2"}>
                      <User
                        address={address as `0x${string}`}
                        direction="horizontal"
                        displayAvatar={true}
                      />
                      {coordinator?.id?.toLowerCase() ===
                      address.toLowerCase() ? (
                        <StarIcon color={"yellow"} />
                      ) : undefined}
                    </Flex>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Stat>
                      <StatNumber>{`${
                        contributor.commitment || 0
                      }%`}</StatNumber>
                    </Stat>
                  </GridItem>
                  <GridItem display={"inline-grid"} colSpan={2}>
                    <ControlledNumberInput
                      fieldName={`ratings.${address}`}
                      precision={0}
                      step={1}
                      min={0}
                      max={100}
                      placeholder={
                        formData.ratings[
                          address.toLowerCase() as `0x${string}`
                        ]?.toString() ?? "0"
                      }
                    />
                  </GridItem>
                </Fragment>
              );
            })}
          </Grid>
        </FormControl>

        <VStack w={"100%"} pt={4}>
          <ButtonGroup>
            <Button
              isLoading={isSubmitting}
              type="reset"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Spacer />
            <Button
              isDisabled={total != 100}
              isLoading={isSubmitting}
              type="submit"
            >
              {total && total != 100
                ? `${100 - total} / 100`
                : "Submit evaluation"}
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </FormProvider>
  );

  return reviewForm;
};

export { ValueReviewForm };
