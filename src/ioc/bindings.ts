import { Services, HttpService, DateService } from '@app/services';
import { container } from '.';

container.bind<HttpService>(Services.HttpService).to(HttpService).inSingletonScope();
container.bind<DateService>(Services.DateService).to(DateService).inSingletonScope();
