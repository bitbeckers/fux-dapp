import { WorkstreamFragmentFragment } from "../../../.graphclient";
import { useResolveSoloWorkstream } from "../../../hooks/resolution";
import { ContributorRow } from "../ContributorRow";
import {
  Button,
  FormControl,
  Grid,
  GridItem,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import _ from "lodash";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

const SoloResolutionForm: React.FC<{
  workstream?: WorkstreamFragmentFragment;
}> = ({ workstream }) => {
  if (!workstream) {
    <Text>Loading...</Text>;
  }

  const toast = useToast();
  const { address: user } = useWallet();

  const resolveSolo = useResolveSoloWorkstream();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({});

  const onSubmit = () => {
    if (
      workstream?.contributors?.length === 1 &&
      workstream.contributors[0].user.id.toLowerCase() ===
        user?.toLowerCase() &&
      workstream?.id
    ) {
      resolveSolo(Number(workstream.id));
    }
  };

  const contributors = workstream?.contributors;

  const reviewForm =
    contributors && contributors?.length > 0 && user ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Grid gap={2} templateColumns="repeat(10, 1fr)">
            <Fragment>
              <GridItem
                display={"flex"}
                alignItems={"center"}
                bg="#301A3A"
                colSpan={6}
                borderLeftRadius="3xl"
              >
                <ContributorRow address={contributors[0].user.id} />
              </GridItem>
              <GridItem
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                colSpan={3}
              >
                <Button h={"100%"} isLoading={isSubmitting} type="submit">
                  Close workstream
                </Button>
              </GridItem>
            </Fragment>
          </Grid>
        </FormControl>

        <VStack w={"100%"} pt={4}>
          <Text paddingBottom={"2em"} paddingTop={"2em"} textAlign={"center"}>
            You are the sole contributor.
          </Text>
        </VStack>
      </form>
    ) : (
      <Text>No contributors found</Text>
    );

  return reviewForm;
};

export { SoloResolutionForm };
