import {
  useSubmitValueEvaluation,
  useValueEvaluation,
} from "../../../hooks/evaluations";
import { useMintVFux } from "../../../hooks/fux";
import { useGetWorkstreamByID } from "../../../hooks/workstream";
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
  Box,
} from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import _, { Dictionary } from "lodash";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  ratings: number[];
};

const ValueReviewForm: React.FC<{
  workstreamID: number;
}> = ({ workstreamID }) => {
  const { address: user } = useWallet();
  const submitEvaluation = useSubmitValueEvaluation();
  const currentEvaluation = useValueEvaluation(user || "", workstreamID);

  const [ratings, setRatings] = useState<any>();

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
    console.log("Value ratings: ", data.ratings);

    if (workstreamID && workstream?.contributors && data.ratings) {
      const contributors = workstream.contributors.filter(
        (contributor) => contributor !== user
      );
      const ratings = data.ratings.filter((rating) => rating);
      submitEvaluation(workstreamID, contributors, ratings);
    }
  };

  // TODO ENS names
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
                    <>
                      <GridItem
                        display={"flex"}
                        alignItems={"center"}
                        bg="#301A3A"
                        colSpan={6}
                      >
                        <Text pl={"1em"}>{contributor}</Text>
                      </GridItem>
                      <GridItem
                        bg="#301A3A"
                        display={"flex"}
                        alignItems={"center"}
                        colSpan={2}
                      >
                        {ratings[contributor] ? (
                          ratings[contributor]
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
                    </>
                  )
              )
            : "No contributors found"}
        </Grid>
      </FormControl>
      <Text paddingBottom={"2em"} paddingTop={"2em"} textAlign={"center"}>
        Assign 100% of your FUX to give
      </Text>

      <HStack w={"100%"} pt={4}>
        <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
          Reset
        </Button>
        <Spacer />
        <Button isLoading={isSubmitting} type="submit">
          Submit review
        </Button>
      </HStack>
    </form>
  );
};

export { ValueReviewForm };
