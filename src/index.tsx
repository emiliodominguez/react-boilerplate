import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import './styles/main.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

reportWebVitals();
