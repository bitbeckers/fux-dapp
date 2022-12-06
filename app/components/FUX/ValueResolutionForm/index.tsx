import { WorkstreamFragmentFragment } from "../../../.graphclient";
import {
  useMintVFux,
  useVFuxBalanceForWorkstreamEvaluation,
} from "../../../hooks/fux";
import {
  useResolveValueEvaluation,
} from "../../../hooks/resolution";
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
  workstream?: WorkstreamFragmentFragment;
}> = ({ workstream }) => {
  if (!workstream) {
    <Text>Loading...</Text>;
  }

  const toast = useToast();
  const { address: user } = useWallet();

  const mintVFux = useMintVFux();
  const resolveEvaluation = useResolveValueEvaluation();
  const vFuxAvailable = useVFuxBalanceForWorkstreamEvaluation(
    Number(workstream?.id)
  );

  const [ratings, setRatings] = useState<{ [address: string]: BigNumberish }>();
  const [total, setTotal] = useState(0);

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
      (evaluation) => evaluation.creator.id.toLowerCase() === user.toLowerCase()
    );

    if (!currentEvaluation) {
      return;
    }

    const addresses = currentEvaluation?.contributors.map(
      (contributor) => contributor.id
    );

    const merged = _.zipObject(addresses, currentEvaluation.ratings);

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
    if (!workstream?.id || Object.values(data.ratings).length == 0) {
      toast({
        title: `Missing input data`,
        status: "error",
      });
      return;
    }

    if (total != 100) {
      toast({
        title: `Not enough: ${total || "..."}/100`,
        status: "error",
      });
      return;
    }

    const filteredData = Object.entries(data.ratings).filter(
      (entry) => entry[0] !== user
    );

    if (filteredData?.length > 0) {
      resolveEvaluation(
        Number(workstream.id),
        filteredData.map((data) => data[0]),
        filteredData.map((data) => BigNumber.from(data[1]))
      );
    }
  };

  const startEvaluation = (
    <VStack w="80%" justifyContent="center">
      <Text>Claim 100vFUX to start evaluating your contributors</Text>
      <Button onClick={() => mintVFux(Number(workstream?.id))}>
        Claim 100 vFUX
      </Button>
    </VStack>
  );

  const contributors = workstream?.contributors;

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
            <Button
              isDisabled={total != 100}
              isLoading={isSubmitting}
              type="submit"
            >
              {total && total != 100
                ? `${100 - total} / 100`
                : "Finalize workstream"}
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    ) : (
      <Text>No contributors found</Text>
    );

  return workstream && !workstream.resolved && vFuxAvailable?.gt(0)
    ? reviewForm
    : startEvaluation;
};

export { ValueResolutionForm };
