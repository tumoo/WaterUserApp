import logo from './logo.svg';
import './App.css';
import RouterPage from './components/RouterPage';
import { SearchProvider } from './components/users/SearchContext'; 

function App() {
  return (
<div className="App">
<SearchProvider>
        <RouterPage />
</SearchProvider>
</div>
  );
}

export default App;
