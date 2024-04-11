import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserAxios } from '../../axios_instance/Axios_instance';

const WalletTransactions = () => {
    const {id} = useParams()
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await UserAxios.get(`api/v1/user/wallet/${id}/transactions`);
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching wallet transactions:', error);
            }
        };
        fetchTransactions();
    }, [id]);

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = sortedTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const paginate = pageNumber => setCurrentPage(pageNumber);

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
                    {currentTransactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.amount}</td>
                            <td>{transaction.transaction_type}</td>
                            <td>{transaction.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {Array.from({ length: Math.ceil(transactions.length / transactionsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        style={{
                            marginRight: '10px',
                            padding: '5px 10px',
                            border: '1px solid #ccc',
                            background: currentPage === index + 1 ? '#007bff' : 'transparent',
                            color: currentPage === index + 1 ? '#fff' : '#000',
                            cursor: 'pointer',
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default WalletTransactions;


