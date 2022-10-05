import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

function buildDevServer(port: number): DevServerConfiguration {
 return {
   port,
   open: true,
   historyApiFallback: true,
 }
}
export default buildDevServer;
