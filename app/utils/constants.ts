export const checkEnvVarConfig = () => {
  const requiredEnvVarNames = [
    {
      name: "NEXT_PUBLIC_CONTRACT_ADDRESS_FUX",
      value: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_FUX"],
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
  erc20TokenAddress: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_FUX"]!,
};

export const urls = {
  graphUrl: process.env["NEXT_PUBLIC_GRAPH_URL"]!,
};
