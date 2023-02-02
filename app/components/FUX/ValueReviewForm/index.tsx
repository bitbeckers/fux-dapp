import {
  WorkstreamFragmentFragment,
  EvaluationFragmentFragment,
} from "../../../.graphclient";
import { useSubmitValueEvaluation } from "../../../hooks/evaluations";
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
  useToast,
  HStack,
  Center,
  Icon,
} from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { BigNumber, BigNumberish } from "ethers";
import _ from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  [address: string]: BigNumberish;
};

//TODO cleanup form
const ValueReviewForm: React.FC<{
  workstream?: WorkstreamFragmentFragment;
}> = ({ workstream }) => {
  if (!workstream) {
    <Text>Loading...</Text>;
  }
  const { address: user } = useWallet();
  const toast = useToast();
  const submitEvaluation = useSubmitValueEvaluation();

  const [ratings, setRatings] = useState<{ [address: string]: BigNumberish }>();
  const [total, setTotal] = useState<number>(0);

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      ratings: ratings,
    },
  });

  const formData = watch();

  useEffect(() => {
    if (!workstream?.evaluations || !user) {
      return;
    }

    const currentEvaluation = workstream.evaluations.find(
      (evaluation: EvaluationFragmentFragment) =>
        evaluation.creator.id.toLowerCase() === user.toLowerCase()
    );

    if (!currentEvaluation) {
      return;
    }

    const addresses = currentEvaluation.contributors.map(
      (contributor) => contributor.id
    );

    const merged = _.zipObject(addresses, currentEvaluation.ratings);

    console.log("Merged: ", merged);

    setRatings(merged);
  }, [user, workstream]);

  //TODO cleanup useEffect with all the !!!!
  useEffect(() => {
    if (!formData.ratings) {
      return;
    }

    const values = Object.values(formData.ratings);

    if (!values) {
      return;
    }

    const totalVFux = values
      .map((rating) => (rating ? +rating : 0))
      .reduce((_total, value) => _total + value, 0);

    if (totalVFux) setTotal(totalVFux);
  }, [formData]);

  const onSubmit = (data: FormData) => {
    if (!total || !workstream?.id || Object.values(data.ratings).length == 0) {
      toast({
        title: `Missing input data`,
        status: "error",
      });
      return;
    }

    if (total != 100) {
      toast({
        title: `Not enough: ${total.toString() || "..."}/100`,
        status: "error",
      });
      return;
    }

    const filteredData = Object.entries(data.ratings).filter(
      (entry) => entry[0] !== user
    );

    if (filteredData?.length > 0) {
      submitEvaluation(
        Number(workstream.id),
        filteredData.map((data) => data[0]),
        filteredData.map((data) => BigNumber.from(data[1]))
      );
    }
  };

  const contributors = workstream?.contributors;
  const owner = workstream?.coordinator?.id;

  console.log("Ratings: ", ratings);

  const reviewForm =
    contributors && contributors?.length > 0 && user ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Text paddingBottom={"2em"} paddingTop={"2em"} textAlign={"center"}>
            Distribute 100 points to rate value contribution
          </Text>
        </Center>
        <FormControl>
          <Grid gap={3} templateColumns="repeat(10, 1fr)">
            {contributors.map((contributor, index) => {
              return contributor.user.id.toLowerCase() ===
                user.toLowerCase() ? undefined : (
                <Fragment key={index}>
                  <GridItem
                    display={"inline-grid"}
                    colSpan={6}
                    borderLeftRadius="3xl"
                    bg="#301A3A"
                    placeItems={"left"}
                  >
                    <ContributorRow address={contributor.user.id} />
                    <Spacer />
                    {contributor.user.id.toLowerCase() ===
                    owner?.toLowerCase() ? (
                      <StarIcon mr={"1em"} />
                    ) : (
                      <></>
                    )}
                  </GridItem>
                  <GridItem bg="#301A3A" display={"inline-grid"} colSpan={3}>
                    <Controller
                      name={`ratings.${contributor.user.id}`}
                      control={control}
                      rules={{ required: true }}
                      key={`ratings.${contributor.user.id}`}
                      render={({ field }) => (
                        <NumberInput {...field}>
                          <NumberInputField
                            ref={field.ref}
                            name={field.name}
                            borderRadius={0}
                            max={100}
                            placeholder={
                              ratings
                                ? ratings[
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
