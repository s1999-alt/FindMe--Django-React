import React, { useEffect, useState } from 'react';
import '../../Styles/walletpage.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import wallet from '../../assets/wallet.gif'

const Wallet = () => {
  const { id } = useParams();
  const [walletAmount, setWalletAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletAmount = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:8000/api/v1/user/wallet/${id}/`);
          setWalletAmount(response.data.balance);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching wallet amount:', error);
        setLoading(false);
      }
    };
    fetchWalletAmount();
  }, [id]);

  return (
    <div className="wallet-container">
      <div className="wallet-box">
        <h2 className="wallet-heading">Wallet</h2>
        <div className="wallet-details">
          <div className="wallet-icon">
            <i className="fas fa-wallet"></i>
          </div>
          <div className="wallet-amount">
            {loading ? <div className="spinner"></div> : (walletAmount !== null ? `₹ ${walletAmount}` : 'No data')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

