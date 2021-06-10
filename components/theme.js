import { extendTheme, useColorModeValue } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
      },
    }),
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: true,
  },
  textStyles: {
    reg: {
      color: "blue.300",
    },
  },
  layerStyles: {
    reg: {
      bgColor: "blue.300",
    },
    hover: {
      bgColor: "blue.200",
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

export const completeStyle = "blue.300";
