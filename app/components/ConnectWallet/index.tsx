import { Button, Link } from "@chakra-ui/react";
import { formatAddress, useENS, useWallet } from "@raidguild/quiver";
import NextLink from "next/link";

const ConnectWallet: React.FC = () => {
  const { connectWallet, isConnecting, isConnected, disconnect, address } =
    useWallet();

  const { ens, loading } = useENS({ address: address ?? "" });

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
              <Link>{ens && !loading ? ens : formatAddress(address)}</Link>
            </Button>
          </NextLink>
        </>
      )}
    </>
  );
};

export default ConnectWallet;
