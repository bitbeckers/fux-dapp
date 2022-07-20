import { useWorkstreams } from "../../../hooks/workstream";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";

const WorkstreamModal: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addWorkstream } = useWorkstreams();
  const [workstream, setWorkstream] = useState<Partial<Workstream>>();

  const handleSourceSelection = (source: string) => {
    setWorkstream({ ...workstream, source });
  };

  const handleNameInput = (name: string) => {
    setWorkstream({ ...workstream, name });
  };

  const handlePrivacySelection = (selection: boolean) => {
    setWorkstream({ ...workstream, publiclyVisible: selection });
  };

  const selection = (
    <RadioGroup onChange={handleSourceSelection} name="selectWorkstreamSource">
      <Stack direction="column">
        <Radio backgroundColor="#301A3A" value="dework" isDisabled>
          Import from Dework
        </Radio>
        <Radio bg="#301A3A" value="manual">
          Manual
        </Radio>
      </Stack>
    </RadioGroup>
  );

  const input = (
    <>
      <Input
        variant="outline"
        placeholder="Name"
        onChange={(event) => handleNameInput(event.target.value)}
      />
      <Checkbox
        onChange={(event) => handlePrivacySelection(event.target.checked)}
      >
        Public
      </Checkbox>
    </>
  );

  const saveWorkStream = () => {
    if (workstream?.name) {
      console.log(`Saving workstream: ${workstream?.name}`);
      addWorkstream(workstream);
      setWorkstream({});
      onClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon />}>
        Add workstream
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="#1D131D" />
        <ModalContent bg="#221527">
          <ModalHeader>Add workstream</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{workstream?.source ? input : selection}</ModalBody>

          <ModalFooter justifyContent={"center"}>
            {workstream?.source ? (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={saveWorkStream}
                isDisabled={workstream?.name ? false : true}
              >
                Save
              </Button>
            ) : undefined}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkstreamModal;
