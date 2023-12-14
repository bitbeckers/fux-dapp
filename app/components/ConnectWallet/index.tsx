import { useBreakpointValue } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";

const ConnectWallet: React.FC = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: true, lg: false });

  return isSmallScreen ? <ConnectKitButton /> : <ConnectKitButton />;
};

export default ConnectWallet;
