import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Portfolio from './components/PortfolioAnalysis';
import News from './components/news';
import Account from './components/Account';
import StockAnalysis from './components/stock-analysis/StockAnalysis';
import StockCard from './components/stock-analysis/stockgraph';
import { SearchProvider } from './components/SearchContext';
import { TrendingStocksProvider } from './components/dashboard/topStocks';


const App = () => {
  return (
    <SearchProvider>
      <TrendingStocksProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Redirect to dashboard */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/news" element={<News />} />
          <Route path="/account" element={<Account />} />
          {/* Use one of these components for stock-analysis route */}
          <Route path="/stock-analysis" element={<StockAnalysis />} /> 
        </Routes>
      </Router>
      </TrendingStocksProvider>
    </SearchProvider>
  );
};

export default App;
