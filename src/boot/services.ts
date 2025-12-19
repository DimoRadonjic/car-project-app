import { boot } from 'quasar/wrappers';
import { servicesSetup } from 'src/api/services';
import { ProxyGarageService } from 'src/api/services/garage/garage.service';
import { ProxyMarketService } from 'src/api/services/market/market.service';

export const marketService = new ProxyMarketService();
export const garageService = new ProxyGarageService(marketService);

export default boot(({ app }) => {
  app.provide('marketService', marketService);
  app.provide('garageService', garageService);
  void servicesSetup();
});
