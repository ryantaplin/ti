import React, {useState, useEffect} from 'react';
import InteractiveBoard from "./interactive/InteractiveBoard";


export default function HomePage() {
    const defaultData = [
        {title: 'Group 1', items: ['1', '2', '3']},
        {title: 'Group 2', items: ['4', '5']}
    ];

    const [data, setData] = useState([]);
    useEffect(() => {
            setData(defaultData)
    }, [setData]);

    //TODO: extract Header/Footer into their own components
    return (
        <div className="page">
            <div className="page-header">
                Task Interface
            </div>
            <div className="page-content">
                <InteractiveBoard data={data}/>
            </div>
            <div className="page-footer">
                Made by Ryan Taplin
            </div>
        </div>
    );
}