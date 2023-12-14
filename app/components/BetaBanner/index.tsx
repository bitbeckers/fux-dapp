import { Box, Text } from "@chakra-ui/react";

const BetaBanner = () => {
  return (
    <Box bg="yellow.500" py={2} textAlign="center">
      <Text color="white" fontWeight="bold">
        This app is in beta, use wisely
      </Text>
    </Box>
  );
};

export default BetaBanner;
