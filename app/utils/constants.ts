export const checkEnvVarConfig = () => {
  const requiredEnvVarNames = [
    {
      name: "NEXT_PUBLIC_CONTRACT_ADDRESS_FUX",
      value: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_FUX"],
    },
    {
      name: "NEXT_PUBLIC_DEFAULT_CHAIN",
      value: process.env["NEXT_PUBLIC_DEFAULT_CHAIN"],
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
  fuxContractAddress: process.env["NEXT_PUBLIC_CONTRACT_ADDRESS_FUX"]!,
};

export const defaultChain = process.env["NEXT_PUBLIC_DEFAULT_CHAIN"];
