import {
  useSubmitValueEvaluation,
  useValueEvaluation,
} from "../../../hooks/evaluations";
import { useGetWorkstreamByID } from "../../../hooks/workstream";
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
  HStack,
  useToast,
  ButtonGroup,
} from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { BigNumber, BigNumberish } from "ethers";
import _, { Dictionary } from "lodash";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  ratings: number[];
};

const ValueReviewForm: React.FC<{
  workstreamID: number;
}> = ({ workstreamID }) => {
  const { address: user } = useWallet();
  const toast = useToast();
  const submitEvaluation = useSubmitValueEvaluation();
  const currentEvaluation = useValueEvaluation(user || "", workstreamID);

  const [ratings, setRatings] = useState<{ [address: string]: BigNumberish }>(
    {}
  );

  console.log("Review workstreamID: ", workstreamID);

  useEffect(() => {
    if (currentEvaluation?.contributors && currentEvaluation?.ratings) {
      const mergedEvaluations = _.zipObject(
        currentEvaluation?.contributors,
        currentEvaluation?.ratings
      );

      console.log("MERGED EVALUATIONS: ", mergedEvaluations);

      setRatings(mergedEvaluations);
    }
  }, [currentEvaluation]);

  const workstream = useGetWorkstreamByID(workstreamID);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      ratings: [],
    },
  });

  // TODO intelligent filtering
  const onSubmit = (data: FormData) => {
    if (workstream?.contributors && data.ratings) {
      const totalVFux = data.ratings
        .map((rating) => Number(rating))
        .reduce((total, value) => +total + value, 0);
      if (totalVFux != 100) {
        toast({
          title: `Not enough vFUX: ${totalVFux.toString()}/100`,
          status: "error",
        });
        return;
      }

      const contributors = workstream.contributors.filter(
        (contributor) => contributor !== user
      );
      const ratings = data.ratings.filter((rating) => rating);
      submitEvaluation(workstreamID, contributors, ratings);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Grid gap={2} templateColumns="repeat(10, 1fr)">
          {workstream?.contributors
            ? workstream.contributors.map(
                (contributor: string, index: number) =>
                  contributor == user ? (
                    ""
                  ) : (
                    <Fragment key={index}>
                      <GridItem
                        display={"flex"}
                        alignItems={"center"}
                        bg="#301A3A"
                        colSpan={6}
                      >
                        <ContributorRow address={contributor} />
                      </GridItem>
                      <GridItem
                        bg="#301A3A"
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        colSpan={3}
                      >
                        {ratings[contributor] ? (
                          <Text>{`${ratings[
                            contributor
                          ].toString()} vFUX`}</Text>
                        ) : (
                          <Controller
                            name={`ratings.${index}`}
                            control={control}
                            rules={{ required: true }}
                            key={`ratings.${index}`}
                            render={({
                              field: { ref, onChange, ...restField },
                            }) => (
                              <NumberInput onChange={onChange} {...restField}>
                                <NumberInputField
                                  ref={ref}
                                  name={restField.name}
                                  borderRadius={0}
                                />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                            )}
                          />
                        )}
                      </GridItem>
                    </Fragment>
                  )
              )
            : "No contributors found"}
        </Grid>
      </FormControl>

      <HStack w={"100%"} pt={4}>
        <Text paddingBottom={"2em"} paddingTop={"2em"} textAlign={"center"}>
          Assign your 100 vFUX to rate value contribution
        </Text>
        <ButtonGroup>
          <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
            Reset
          </Button>
          <Spacer />
          <Button isLoading={isSubmitting} type="submit">
            Submit review
          </Button>
        </ButtonGroup>
      </HStack>
    </form>
  );
};

export { ValueReviewForm };
