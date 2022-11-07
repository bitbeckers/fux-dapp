import { WorkstreamEvaluationsQuery } from "../../../.graphclient";
import {
  useMintVFux,
  useVFuxBalanceForWorkstreamEvaluation,
} from "../../../hooks/fux";
import { useResolveValueEvaluation } from "../../../hooks/resolution";
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
  VStack,
  ButtonGroup,
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

const ValueResolutionForm: React.FC<{
  workstream?: WorkstreamEvaluationsQuery;
}> = ({ workstream }) => {
  const toast = useToast();
  const { address: user } = useWallet();
  const mintVFux = useMintVFux();

  const resolveEvaluation = useResolveValueEvaluation();
  const vFuxAvailable =
    useVFuxBalanceForWorkstreamEvaluation(Number(workstream?.workstream?.id)) ||
    undefined;

  const [ratings, setRatings] = useState<{ [address: string]: BigNumberish }>();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      ratings: ratings || {},
    },
  });

  const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
  console.log("FIELDS: ", watchAllFields);

  useEffect(() => {
    if (!workstream?.evaluations || !user) {
      return;
    }

    const currentEvaluation = workstream.evaluations.find(
      (evaluation) => evaluation.creator.id.toLowerCase() === user.toLowerCase()
    );

    if (currentEvaluation) {
      const addresses = currentEvaluation.contributors.map(
        (contributor) => contributor.id
      );

      const merged = _.zipObject(addresses, currentEvaluation.ratings);

      console.log("MERGED: ", merged);

      setRatings(merged);
    }
  }, [user, workstream]);

  const onSubmit = (data: FormData) => {
    if (
      !workstream?.workstream?.id ||
      Object.values(data.ratings).length == 0
    ) {
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

    console.log("FilteredData: ", filteredData);
    console.log(
      "Address: ",
      filteredData.map((data) => data[0])
    );
    console.log(
      "Rating: ",
      filteredData.map((data) => BigNumber.from(data[1]))
    );

    if (filteredData?.length > 0) {
      resolveEvaluation(
        Number(workstream.workstream.id),
        filteredData.map((data) => data[0]),
        filteredData.map((data) => BigNumber.from(data[1]))
      );
    }
  };

  const startEvaluation = (
    <VStack w="80%" justifyContent="center">
      <Text>Claim 100vFUX to start evaluating your contributors</Text>
      <Button onClick={() => mintVFux(Number(workstream?.workstream?.id))}>
        Claim 100 vFUX
      </Button>
    </VStack>
  );

  const contributors = workstream?.workstream?.contributors;

  const reviewForm =
    contributors && contributors?.length > 0 && user ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Grid gap={2} templateColumns="repeat(10, 1fr)">
            {contributors.map(({ user: contributor }, index) => {
              return contributor.id.toLowerCase() ===
                user.toLowerCase() ? undefined : (
                <Fragment key={index}>
                  <GridItem
                    display={"flex"}
                    alignItems={"center"}
                    bg="#301A3A"
                    colSpan={6}
                    borderLeftRadius="3xl"
                  >
                    <ContributorRow address={contributor.id} />
                  </GridItem>
                  <GridItem
                    bg="#301A3A"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    colSpan={3}
                  >
                    <Controller
                      name={`ratings.${contributor.id}`}
                      control={control}
                      rules={{ required: true }}
                      key={`ratings.${contributor.id}`}
                      render={({ field }) => (
                        <NumberInput {...field}>
                          <NumberInputField
                            ref={field.ref}
                            name={field.name}
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
                </Fragment>
              );
            })}
          </Grid>
        </FormControl>

        <VStack w={"100%"} pt={4}>
          <Text paddingBottom={"2em"} paddingTop={"2em"} textAlign={"center"}>
            Assign your 100 vFUX to rate value contribution
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
              Finalize workstream
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    ) : (
      <Text>No contributors found</Text>
    );

  return workstream?.workstream?.resolved && vFuxAvailable?.gt(0)
    ? reviewForm
    : startEvaluation;
};

export { ValueResolutionForm };
