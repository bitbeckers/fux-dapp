import { Button, Text } from "@raidguild/design-system";
import { formatAddress, useWallet } from "@raidguild/quiver";

const ConnectWallet: React.FC = () => {
  const { connectWallet, isConnecting, isConnected, disconnect, address } =
    useWallet();
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
          <Button colorScheme="red" onClick={() => disconnect()}>
            {formatAddress(address)}
          </Button>
        </>
      )}
    </>
  );
};

export default ConnectWallet;
