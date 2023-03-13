import {
  EvaluationFragmentFragment,
  WorkstreamFragmentFragment,
} from "../../../.graphclient";
import { useCustomToasts } from "../../../hooks/toast";
import { contractAddresses, contractABI } from "../../../utils/constants";
import { ContributorRow } from "../ContributorRow";
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
  HStack,
  Center,
  Table,
  Spinner,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { BigNumberish } from "ethers";
import _ from "lodash";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";

type FormData = {
  [address: string]: BigNumberish;
};

const findEvaluations = (
  workstream: WorkstreamFragmentFragment,
  user: `0x${string}`
) => {
  const currentEvaluation = workstream?.evaluations?.find(
    (evaluation: EvaluationFragmentFragment) =>
      evaluation.creator.id.toLowerCase() === user.toLowerCase()
  );

  if (!currentEvaluation) {
    console.log("No current founr");
    return;
  }

  const addresses = currentEvaluation.contributors.map(
    (contributor) => contributor.id
  );

  return _.zipObject(addresses, currentEvaluation.ratings);
};

const ValueReviewForm: React.FC<{
  workstream: WorkstreamFragmentFragment;
}> = ({ workstream }) => {
  const { address: user } = useAccount();
  const toast = useCustomToasts();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      ratings: 0,
    },
  });

  const formData = watch();

  const _contributors = Object.keys(formData.ratings);
  const _ratings = Object.values(formData.ratings).map((rating) => +rating);
  const total = _ratings.length > 0 ? _ratings.reduce((a, b) => a + b, 0) : 0;

  console.log("Total: ", total);

  console.log("Contributors: ", _contributors);
  console.log("Ratings: ", _ratings);

  const { config } = usePrepareContractWrite({
    address: contractAddresses.fuxContractAddress,
    abi: contractABI.fux,
    functionName: "submitEvaluation",
    args: [workstream.id, _contributors, _ratings],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(e) {
      toast.error(e);
    },
    onSuccess(data) {
      toast.success("Submitted Evaluation", "Evaluation submitted succesfully");
      console.log(data);
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("DATA: ", data);

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

  const contributors = workstream?.contributors;
  const owner = workstream?.coordinator?.id;

  const reviewForm =
    contributors && contributors?.length > 0 && user ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Text paddingBottom={"2em"} paddingTop={"2em"} textAlign={"center"}>
            Distribute 100 points to rate value contribution
          </Text>
        </Center>
        <FormControl>
          <Grid gap={2} templateColumns="repeat(10, 1fr)">
            {contributors.map((contributor, index) => {
              return contributor.user.id.toLowerCase() ===
                user.toLowerCase() ? undefined : (
                <Fragment key={index}>
                  <GridItem
                    display={"inline-grid"}
                    colSpan={6}
                    borderLeftRadius="3xl"
                    bg="#301A3A"
                  >
                    <HStack>
                      <Table>
                        <ContributorRow
                          address={contributor.user.id as `0x${string}`}
                        />
                      </Table>
                      <Spacer />
                      {contributor.user.id.toLowerCase() ===
                      owner?.toLowerCase() ? (
                        <StarIcon mr={"1em"} />
                      ) : undefined}
                    </HStack>
                  </GridItem>
                  <GridItem bg="#301A3A" display={"inline-grid"} colSpan={3}>
                    <Controller
                      name={`ratings.${contributor.user.id}`}
                      control={control}
                      rules={{ required: true }}
                      key={`ratings.${contributor.user.id}`}
                      render={({ field: { ...restField } }) => (
                        <NumberInput {...restField}>
                          <NumberInputField
                            {...register(`ratings.${contributor.user.id}`)}
                            name={restField.name}
                            borderRadius={0}
                            max={100}
                            placeholder={
                              formData &&
                              formData[contributor.user.id.toLowerCase()]
                                ? formData[
                                    contributor.user.id.toLowerCase()
                                  ].toString()
                                : "0"
                            }
                          />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      )}
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
    ) : (
      <Text>No contributors found</Text>
    );

  return reviewForm;
};

export { ValueReviewForm };
