import { createTheme, MantineProvider } from "@mantine/core";
import { RouterProvider } from "./providers/router-provider";

// https://patrickpassarella.com/blog/creating-electron-react-app
// https://www.electronjs.org/docs/latest/api/safe-storage

const theme = createTheme({});
const App = () => {
  return (
    <MantineProvider theme={theme}>
      <RouterProvider />;
    </MantineProvider>
  );
};

export default App;
