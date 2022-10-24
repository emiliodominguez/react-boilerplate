import 'reflect-metadata';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import '@app/ioc/bindings';
import '@app/styles/main.scss';

const root = createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

reportWebVitals();
