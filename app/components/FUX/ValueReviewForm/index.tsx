import { useSubmitValueEvaluation } from "../../../hooks/evaluations";
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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  ratings: number[];
};

const ValueReviewForm: React.FC<{
  workstreamID: number;
}> = ({ workstreamID }) => {
  const submitEvaluation = useSubmitValueEvaluation();
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

  const onSubmit = (data: FormData) => {
    console.log("Value ratings: ", data.ratings);

    if (workstreamID && workstream?.contributors && data.ratings) {
      submitEvaluation(workstreamID, workstream?.contributors, data.ratings);
    }
  };

  // TODO ENS names
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Grid gap={2} templateColumns="repeat(10, 1fr)">
          {workstream?.contributors
            ? workstream.contributors.map(
                (contributor: string, index: number) => (
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
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"flex-end"}
                      bg="#301A3A"
                      colSpan={2}
                    >
                      <Text pr={"1em"}>{`${69} %`}</Text>
                    </GridItem>
                    <GridItem
                      bg="#301A3A"
                      display={"flex"}
                      alignItems={"center"}
                      colSpan={2}
                    >
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
                    </GridItem>
                  </>
                )
              )
            : "No contributors found"}
        </Grid>
      </FormControl>

      <HStack w={"100%"} pt={4}>
        <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
          Reset
        </Button>
        <Spacer />

        <Text>Assign 100% of your FUX to give</Text>
        <Spacer />

        <Button isLoading={isSubmitting} type="submit">
          Submit review
        </Button>
      </HStack>
    </form>
  );
};

export { ValueReviewForm };
