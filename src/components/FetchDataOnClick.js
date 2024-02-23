import React, { useState } from 'react';

const FetchDataOnClick = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDataElementary = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://example.com/api/data");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataMiddle = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://example.com/api/data");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    const fetchDataHigh = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("https://example.com/api/data");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={fetchDataElementary} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Data of Elementary'}
            </button>

            <button onClick={fetchDataMiddle} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Data of Middle'}
            </button>

            <button onClick={fetchDataHigh} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Data of High'}
            </button>

            {error && <div>Error: {error}</div>}
            {data && (
                <div>
                    <h2>Images:</h2>
                    {data.images.map((image, index) => (
                        <img key={index} src={image.url} alt={image.alt} />
                    ))}
                    <h2>Text:</h2>
                    <p>{data.text}</p>
                </div>
            )}
        </div>
    );
};

export default FetchDataOnClick;
