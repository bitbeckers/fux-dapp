import { Button, Link } from "@chakra-ui/react";
import { formatAddress, useWallet } from "@raidguild/quiver";
import NextLink from "next/link";

const ConnectWallet: React.FC = () => {
  const { connectWallet, isConnecting, isConnected, disconnect, address } =
    useWallet();

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
              <Link>{formatAddress(address)}</Link>
            </Button>
          </NextLink>
        </>
      )}
    </>
  );
};

export default ConnectWallet;
