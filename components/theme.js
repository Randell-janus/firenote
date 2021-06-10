import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.50",
      },
    },
  },
  textStyles: {
    mdmdlg: {
      fontSize: ["md", "md", "lg"],
    },
    smsmmd: {
      fontSize: ["sm", "sm", "md"],
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