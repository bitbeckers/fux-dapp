import { extendTheme, defineStyleConfig, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: `'stolzl', sans-serif`,
    body: `'stolzl', sans-serif`,
    mono: `'bdr-mono', monospace`,
  },
  colors: {
    primary: "#8E4EC6",
  },
  styles: {
    global: {
      body: {
        color: "white",
        bg: "#1D131D",
        fontWeight: "300",
        fontFamily: `'stolzl', monospace`,
      },
      a: { color: '#8E4EC6', },
      mono: {
        color: "white",
        fontWeight: "300",
        fontFamily: `'bdr-mono', monospace`,
      },
    },
  },
  components: {
    Stat: {
      defaultProps: {
        fontFamily: "mono",
      },
    },
    Link: {
      baseStyle: {
        colorScheme: "primary",
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
