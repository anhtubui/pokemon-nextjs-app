import React from 'react';

type Props = {
    handleClick: () => void;
}

const Button = ({handleClick}: Props) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClick}
        >
            Click me
        </button>
    );
};

export default Button;
