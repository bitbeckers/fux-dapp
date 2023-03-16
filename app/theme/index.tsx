import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: `'Stolzl', sans-serif`,
    body: `'Stolzl', sans-serif`,
    mono: `'BDR Mono', monotype`,
  },
  styles: {
    global: {
      body: {
        color: "white",
        bg: "#1D131D",
        fontWeight: "400",
      },
    },
  },
  components: {
    Stat: {
      defaultProps: {
        fontFamily: `"BDR Mono", monotype`,
      },
    },
    Button: {
      defaultProps: {
        colorScheme: "primary",
        variant: "solid",
        fontWeight: "400",
        fontFamily: "texturina",
      },
      variants: {
        solid: () => ({
          textTransform: "uppercase",
          maxWidth: "100%",
          width: "auto",
          height: "40px",
          color: "white",
          borderRadius: "2px",
          background: "#8E4EC6",
          paddingLeft: "24px",
          paddingRight: "24px",
          _hover: {
            background: "#C74EC3",
          },
          _focus: {
            boxShadow: "none",
          },
        }),
      },
    },
    Text: {
      variants: {
        mono: () => ({
          fontFamily: `"BDR Mono", monotype`,
        }),
      },
    },
  },
});
