import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const WalletTransactions = () => {
    const {id} = useParams()
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/user/wallet/${id}/transactions`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching wallet transactions:', error);
            }
        };
        fetchTransactions();
    }, [id]);

    return (
        <div>
            <h2>Wallet Transactions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.amount}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>{transaction.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WalletTransactions;


