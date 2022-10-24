import { Services, HttpService } from '@app/services';
import { container } from '.';

container.bind<HttpService>(Services.HttpService).to(HttpService).inSingletonScope();
