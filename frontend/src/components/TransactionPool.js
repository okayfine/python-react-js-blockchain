import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';
import history from '../history';
import {API_BASE_URL, SECONDS_JS} from '../config';


const POLL_INTERVAL = 10 * SECONDS_JS

function TransactionPool(){
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions= () => {
        fetch(`${API_BASE_URL}/transactions`)
        .then(response=>response.json())
        .then(json=>{
            console.log('Transactions json', json);
            setTransactions(json);
        });
    }

    useEffect(() => {
        fetchTransactions();
        const intervalId = setInterval(fetchTransactions, POLL_INTERVAL);
        return () => clearInterval(intervalId)
    }, [])

    const fetchMineBlock = () => {
        fetch(`${API_BASE_URL}/blockchain/mine`)
        .then(()=>{
            alert('Mining Successful');

            history.push('/blockchain')
        });
    }

    return (
        <div className="TransactionPool">
            <Link to="/">HOME</Link>
            <hr/>
            <h3>TransactionPool</h3>
            <div>
                {
                    transactions.map(transaction =>(
                        <div key={transaction.id}>
                            <hr/>
                            <Transaction transaction={transaction}/>
                        </div>
                    ))
                }
            </div>
            <hr/>
            <Button
                variant="danger"
                onClick={fetchMineBlock}
            >
                Mine a Block of these Transactions
            </Button>
        </div>
    )
}

export default TransactionPool