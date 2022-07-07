import { useToken } from "../../hooks/contract";
import {
  Text,
  Heading,
  Card,
  Button,
  Input,
  FormControl,
} from "@raidguild/design-system";
import { formatAddress } from "@raidguild/quiver";
import { ethers } from "ethers";
import { Form, Formik } from "formik";

interface Values {
  newAddress: string;
}

const TransferOwnership: React.FC = () => {
  const { transferOwnership, owner } = useToken();

  const onAddressSubmit = async (values: Values) => {
    console.log("values: ", values);
    if (
      values.newAddress &&
      ethers.utils.isAddress(values.newAddress) &&
      values.newAddress !== owner
    ) {
      console.log("transfering ownership to: ", values.newAddress);
      await transferOwnership(values.newAddress);
    }
  };

  return (
    <Card
      minW={"300"}
      boxSize={"xs"}
      heading={
        <Heading w={"100%"} variant="noShadow" textAlign={"center"}>
          Owner
        </Heading>
      }
      variant="withHeader"
      bg="whiteAlpha.200"
    >
      <Text size="4xl">{formatAddress(owner)}</Text>
      <Formik
        enableReinitialize
        initialValues={{ newAddress: "" }}
        onSubmit={async (values: Values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          try {
            onAddressSubmit(values);
          } catch (err) {
            console.log(err);
          } finally {
            setSubmitting(false);
            resetForm();
          }
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form>
            <FormControl id="newOwner">
              <Input
                variant={"outline"}
                value={values.newAddress}
                label="New owner address"
                name="newAddress"
                placeholder="Provide new owner address"
                onChange={(e: any) =>
                  setFieldValue("newAddress", e.target.value)
                }
              />
            </FormControl>
            <Button
              variant="solid"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting"
              width="100%"
            >
              TRANSFER OWNERSHIP
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default TransferOwnership;
