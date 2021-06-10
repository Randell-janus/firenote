import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
      },
    }),
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  textStyles: {
    mdmdlg: {
      fontSize: ["md", "md", "lg"],
    },
    smsmmd: {
      fontSize: ["sm", "sm", "md"],
    },
  },
  layerStyles: {
    reg: {
      bgColor: "red.500",
    },
    white: {
      color: "white",
    },
  },
  components: {
    Button: {
      sizes: {
        md: {
          fontSize: ["sm", "sm", "md"],
        },
      },
    },
  },
});
