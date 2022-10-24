import { useUserProfile } from "../../hooks/user";
import { Button, Link } from "@chakra-ui/react";
import { useWallet } from "@raidguild/quiver";
import NextLink from "next/link";

const ConnectWallet: React.FC = () => {
  const { connectWallet, isConnecting, isConnected, disconnect } = useWallet();

  const { displayName } = useUserProfile();

  const onDisconnect = () => {
    disconnect();
  };

  return (
    <>
      {!isConnected && (
        <Button
          colorScheme="teal"
          disabled={isConnecting}
          onClick={() => !isConnected && connectWallet()}
        >
          {isConnecting
            ? "Connecting..."
            : isConnected
            ? "Connected"
            : "Connect Wallet"}
        </Button>
      )}
      {isConnected && (
        <>
          <NextLink href="/start" passHref>
            <Button colorScheme="red" onClick={() => onDisconnect()}>
              <Link>{displayName(true)}</Link>
            </Button>
          </NextLink>
        </>
      )}
    </>
  );
};

export default ConnectWallet;
