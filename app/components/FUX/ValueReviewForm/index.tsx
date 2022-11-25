import { WorkstreamFragmentFragment } from "../../../.graphclient";
import { useSubmitValueEvaluation } from "../../../hooks/evaluations";
import { ContributorRow } from "../ContributorRow";
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
  const { address: user } = useWallet();
  const toast = useToast();
  const submitEvaluation = useSubmitValueEvaluation();

  const [ratings, setRatings] = useState<{ [address: string]: BigNumberish }>();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      ratings: ratings,
    },
  });

  useEffect(() => {
    if (!workstream?.evaluations || !user) {
      return;
    }

    const currentEvaluation = workstream.evaluations.find(
      (evaluation) => evaluation.creator.id.toLowerCase() === user.toLowerCase()
    );

    console.log("Evaluation found: ", currentEvaluation);

    if (currentEvaluation) {
      const addresses = currentEvaluation.contributors.map(
        (contributor) => contributor.id
      );

      const merged = _.zipObject(addresses, currentEvaluation.ratings);

      console.log("Merged: ", merged);

      setRatings(merged);
    }
  }, [user, workstream]);

  const onSubmit = (data: FormData) => {
    if (!workstream?.id || Object.values(data.ratings).length == 0) {
      toast({
        title: `Missing input data`,
        status: "error",
      });
      return;
    }

    const totalVFux = Object.values(data.ratings)
      .map((rating) => Number(rating))
      .reduce((total, value) => +total + value, 0);

    if (totalVFux != 100) {
      toast({
        title: `Not enough vFUX: ${totalVFux.toString()}/100`,
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

  console.log("Ratings: ", ratings);

  const reviewForm =
    contributors && contributors?.length > 0 && user ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Grid gap={2} templateColumns="repeat(10, 1fr)">
            {contributors.map((contributor, index) => {
              return contributor.user.id.toLowerCase() ===
                user.toLowerCase() ? undefined : (
                <Fragment key={index}>
                  <GridItem
                    display={"flex"}
                    alignItems={"center"}
                    bg="#301A3A"
                    colSpan={6}
                    borderLeftRadius="3xl"
                  >
                    <ContributorRow address={contributor.user.id} />
                  </GridItem>
                  <GridItem
                    bg="#301A3A"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    colSpan={3}
                  >
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
          <Text paddingBottom={"2em"} paddingTop={"2em"} textAlign={"center"}>
            Distribute 100 points to rate value contribution
          </Text>
          <ButtonGroup>
            <Button
              isLoading={isSubmitting}
              type="reset"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Spacer />
            <Button isLoading={isSubmitting} type="submit">
              Submit evaluation
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
