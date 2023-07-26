import { useBreakpointValue } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectWallet: React.FC = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: true, lg: false });

  return isSmallScreen ? (
    <ConnectButton chainStatus="icon" showBalance={false} />
  ) : (
    <ConnectButton />
  );
};

export default ConnectWallet;
