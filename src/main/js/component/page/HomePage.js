import React from 'react';
import InteractiveBoard from "./InteractiveBoard";


export default function HomePage() {
    const data = {
        owner: {
            name: 'Task Interface',
            prefix: 'TI',
        },
        columns: [{
            name: 'Group 1',
            cards: [
                {number: '1'},
                {number: '2'},
                {number: '3'},
                {number: '4'}
            ]
        }, {
            name: 'Group 2',
            cards: [
                {number: '5'},
                {number: '6'}
            ]
        }, {
            name: 'Group 3',
            cards: []
        }]
    };

    const containerStyle = {
        minHeight: '100vh',
        minWidth: '100vw',
        backgroundColor: '#282c34',
        position: 'absolute',
        overflow: 'hidden'
    };

    return (
        <div className="body" style={containerStyle}>
            <div style={{height: '25px', padding: '20px', backgroundColor: '#49505e', color: 'white'}}>
                Interface Task Interface
            </div>
            <InteractiveBoard boardPrefix={data.owner.prefix}/>
        </div>
    );
}