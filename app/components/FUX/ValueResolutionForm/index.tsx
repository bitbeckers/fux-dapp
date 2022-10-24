import {
  useSubmitValueEvaluation,
  useValueEvaluation,
} from "../../../hooks/evaluations";
import { useResolveValueEvaluation } from "../../../hooks/resolution";
import { useGetWorkstreamByID } from "../../../hooks/workstream";
import { EvaluationAccordionItem } from "../EvaluationAccordionItem";
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
  Accordion,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import { BigNumberish } from "ethers";
import _, { add, Dictionary } from "lodash";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  ratings: number[];
};

const ValueResolutionForm: React.FC<{
  workstreamID: number;
}> = ({ workstreamID }) => {
  const router = useRouter();
  const { address: user } = useWallet();
  const resolveEvaluation = useResolveValueEvaluation();
  const currentEvaluation = useValueEvaluation(user || "", workstreamID);

  const [ratings, setRatings] = useState<{ [address: string]: BigNumberish }>(
    {}
  );

  console.log("Resolution workstreamID: ", workstreamID);

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

  // TODO intelligent filtering
  const onSubmit = (data: FormData) => {
    console.log("Value resolution: ", data.ratings);

    if (workstream?.contributors && data.ratings) {
      const contributors = workstream.contributors.filter(
        (contributor) => contributor !== user
      );
      const ratings = data.ratings.filter((rating) => rating);
      resolveEvaluation(workstreamID, contributors, ratings).then(() =>
        router.push("/workstreams")
      );
    }
  };

  // TODO ENS names
  return (
    <VStack>
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
                          <Text pl={"1em"}>{contributor}</Text>
                        </GridItem>
                        <GridItem
                          bg="#301A3A"
                          display={"flex"}
                          alignItems={"center"}
                          colSpan={2}
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
        <Text paddingBottom={"2em"} paddingTop={"2em"} textAlign={"center"}>
          Assign 100% of your FUX to give
        </Text>

        <HStack w={"100%"} pt={4} pb={"2em"}>
          <Button isLoading={isSubmitting} type="reset" onClick={() => reset()}>
            Reset
          </Button>
          <Spacer />
          <Button isLoading={isSubmitting} type="submit">
            Resolve
          </Button>
        </HStack>
        {workstream?.contributors ? (
          <>
            <Heading>Peer evaluations</Heading>
            <Accordion>
              {workstream.contributors.map((address, index) =>
                address == user ? (
                  <></>
                ) : (
                  <EvaluationAccordionItem
                    address={address}
                    workstreamID={workstreamID}
                    key={index}
                  />
                )
              )}
            </Accordion>
          </>
        ) : undefined}
      </form>
    </VStack>
  );
};

export { ValueResolutionForm };
