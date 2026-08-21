import React, { useState, useRef, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_STOCKS } from '../data/mockData';

const SearchBar = ({ placeholder = "Search Indian stocks by symbol or name (e.g. RELIANCE, TCS)..." }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const results = MOCK_STOCKS.filter(
        stock => stock.symbol.toLowerCase().includes(q) || stock.name.toLowerCase().includes(q)
      );
      setFilteredStocks(results);
      setIsOpen(true);
    } else {
      setFilteredStocks([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (symbol) => {
    navigate(`/stock/${symbol}`);
    setQuery('');
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filteredStocks.length > 0) {
      handleSelect(filteredStocks[0].symbol);
    } else if (query.trim()) {
      alert(`No stock found matching "${query}". Try RELIANCE, TCS, HDFCBANK, INFY, or ITC.`);
    }
  };

  return (
    <div ref={searchRef} style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputWrapper}>
          <Search size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder={placeholder}
            style={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && setIsOpen(true)}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={styles.clearBtn}
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button type="submit" className="btn" style={styles.submitBtn}>
          Search
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div style={styles.dropdown} className="animate-fade-in">
          {filteredStocks.length > 0 ? (
            <div>
              <div style={styles.dropdownHeader}>
                <span>MATCHING STOCKS ({filteredStocks.length})</span>
              </div>
              {filteredStocks.map((stock) => {
                const isPositive = stock.change >= 0;
                return (
                  <div
                    key={stock.symbol}
                    style={styles.resultItem}
                    onClick={() => handleSelect(stock.symbol)}
                  >
                    <div style={styles.resultLeft}>
                      <span style={styles.symbolBadge}>{stock.symbol}</span>
                      <span style={styles.stockName}>{stock.name}</span>
                    </div>
                    <div style={styles.resultRight}>
                      <span style={styles.price}>₹{stock.price.toFixed(2)}</span>
                      <span
                        style={{
                          ...styles.changeBadge,
                          color: isPositive ? 'var(--success)' : 'var(--danger)',
                          background: isPositive ? 'var(--success-bg)' : 'var(--danger-bg)',
                        }}
                      >
                        {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                        {isPositive ? '+' : ''}{stock.change}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={styles.noResult}>
              <p className="text-muted">No stocks found for "{query}"</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Try searching for RELIANCE, TCS, HDFCBANK, INFY, or ITC
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: '560px',
  },
  form: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
    width: '100%',
  },
  inputWrapper: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '1.1rem',
    color: 'var(--text-muted)',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '0.9rem 2.75rem 0.9rem 3rem',
    color: 'var(--text-main)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.25s ease',
    backdropFilter: 'blur(10px)',
  },
  clearBtn: {
    position: 'absolute',
    right: '0.9rem',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem',
    borderRadius: '50%',
  },
  submitBtn: {
    padding: '0.9rem 1.6rem',
    borderRadius: '12px',
    whiteSpace: 'nowrap',
    fontSize: '0.95rem',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    right: 0,
    background: '#151923',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    boxShadow: '0 20px 35px rgba(0, 0, 0, 0.45)',
    zIndex: 1000,
    overflow: 'hidden',
    backdropFilter: 'blur(16px)',
  },
  dropdownHeader: {
    padding: '0.65rem 1.25rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    borderBottom: '1px solid var(--border)',
    letterSpacing: '0.05em',
  },
  resultItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.85rem 1.25rem',
    cursor: 'pointer',
    transition: 'background 0.15s ease',
    borderBottom: '1px solid rgba(45, 55, 72, 0.3)',
  },
  resultLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
  },
  symbolBadge: {
    background: 'rgba(59, 130, 246, 0.15)',
    color: 'var(--accent-color)',
    padding: '0.25rem 0.6rem',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '0.85rem',
  },
  stockName: {
    fontSize: '0.9rem',
    color: 'var(--text-main)',
    fontWeight: '500',
  },
  resultRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
  },
  price: {
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  changeBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.2rem',
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '0.25rem 0.5rem',
    borderRadius: '6px',
  },
  noResult: {
    padding: '1.5rem',
    textAlign: 'center',
  },
};

export default SearchBar;
