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
    primary: {
      "50": "#f9f6fc",
      "100": "#e8dbf4",
      "200": "#d4bcea",
      "300": "#bc97dd",
      "400": "#af81d6",
      "500": "#9c63cd",
      "600": "#894bbf",
      "700": "#6e3d9a",
      "800": "#5d3382",
      "900": "#43255e",
    },
    plum: {
      50: "#fde9ff",
      100: "#eec3f0",
      200: "#df9de1",
      300: "#d476d5",
      400: "#c851c4",
      500: "#aa37ae",
      600: "#7f2a89",
      700: "#561d62",
      800: "#310f3c",
      900: "#110318",
    },
  },
  styles: {
    global: {
      body: {
        color: "white",
        bg: "#1D131D",
        fontWeight: "300",
        fontFamily: `'stolzl', monospace`,
      },
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
      defaultProps: {
        colorScheme: "white",
      },
      variants: {
        mono: () => ({
          fontFamily: `"BDR Mono", monotype`,
        }),
      },
    },
  },
});
