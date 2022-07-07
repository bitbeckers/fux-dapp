export const checkEnvVarConfig = () => {
  const requiredEnvVarNames = [
    {
      name: "NEXT_PUBLIC_CONTRACT_ADDRESS_ERC20_TOKEN",
      value: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_ERC20_TOKEN"],
    },
    {
      name: "NEXT_PUBLIC_CONTRACT_ADDRESS_ERC721_NFT",
      value: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_ERC721_NFT"],
    },
    {
      name: "NEXT_PUBLIC_CONTRACT_ADDRESS_STAKING_POOL",
      value: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_STAKING_POOL"],
    },
    {
      name: "NEXT_PUBLIC_GRAPH_URL",
      value: process.env["NEXT_PUBLIC_GRAPH_URL"],
    },
  ];

  requiredEnvVarNames.forEach((envVarConfig) => {
    if (envVarConfig.value === undefined) {
      throw new Error(
        `Environment variable ${envVarConfig.name} is required for starting the application`
      );
    }
  });
};
checkEnvVarConfig();

export const contractAddresses = {
  erc20TokenAddress: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_ERC20_TOKEN"]!,
  erc721NFTAddress: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_ERC721_NFT"]!,
  stakingPoolAddress: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_STAKING_POOL"]!,
};

export const urls = {
  graphUrl: process.env["NEXT_PUBLIC_GRAPH_URL"]!,
};
