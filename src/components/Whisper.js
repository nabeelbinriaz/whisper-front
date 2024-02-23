// import React, { useState } from 'react';

// const Whisper = () => {
//     const [audio, setAudio] = useState(null);
//     const [response, setResponse] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     function handleInput(e) {
//         setAudio(e.target.files[0]);
//     }

//     async function handleSubmit() {
//         setLoading(true);
//         setError(null);

//         const formData = new FormData();
//         formData.append("file", audio);

//         try {
//             const response = await fetch("https://s9g36m1m-8000.inc1.devtunnels.ms/transcribe/", {
//                 method: "POST",
//                 body: formData,
//                 timeout: 60000000
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             setResponse(data);
//         } catch (error) {
//             setError('504 Gateway Timeout: The server did not receive a timely response from the upstream server.');
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div>
//             <input type='file' onChange={handleInput}></input>
//             <button onClick={handleSubmit}>Submit</button>

//             {loading && <div>Loading...</div>}
//             {error && <div>Error: {error}</div>}

//             <h3>Result:</h3>
//             <p>{JSON.stringify(response)}</p>
//         </div>
//     );
// }

// export default Whisper;


// new
// import React, { useState } from 'react';

// const Whisper = () => {
//     const [audio, setAudio] = useState(null);
//     const [response, setResponse] = useState();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     function handleInput(e) {
//         setAudio(e.target.files[0]);
//     }

//     async function handleSubmit() {
//         setLoading(true);
//         setError(null);

//         const formData = new FormData();
//         formData.append("file", audio);

//         try {
//             const response = await fetch("http://127.0.0.1:8000/transcribe/", {
//                 method: "POST",
//                 body: formData
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             setResponse(data);
//         } catch (error) {
//             setError(error.message || 'An unknown error occurred.');
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div>
//             <input type='file' onChange={handleInput}></input>
//             <button onClick={handleSubmit}>Submit</button>

//             {loading && <div>Loading...</div>}
//             {error && <div>Error: {error}</div>}

//             <h3>Result:</h3>
//             <p>{JSON.stringify(response)}</p>
//         </div>

//     //     <div className="flex justify-center items-center h-screen">
//     //     <div className="max-w-md w-full bg-white shadow-xl mt-[500px] overflow-hidden">
//     //         <div className="px-4 py-6">
//     //             <h2 className="text-2xl font-bold mb-4">File Upload</h2>
//     //             <input type='file' onChange={handleInput} className="mb-4"></input>
//     //             <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit kar</button>

//     //             {loading && <div className="mt-4">Loading...</div>}
//     //             {error && <div className="mt-4 text-red-500">Error: {error}</div>}

//     //             <div className="mt-4">
//     //                 <h3 className="font-bold">Result:</h3>
//     //                 <p>{JSON.stringify(response)}</p>
//     //             </div>
//     //         </div>
//     //     </div>
//     // </div>
//     );
// }

// export default Whisper;
//new

//fresh
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  fileInput: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(2),
  },
  summary: {
    marginTop: theme.spacing(4),
  },
}));

const Whisper = () => {
  const classes = useStyles();
  const [audio, setAudio] = useState(null);
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    if (response) {
      fetchSummary();
    }
  }, [response]);

  async function fetchSummary() {
    try {
      const response = await fetch("YOUR_SUMMARY_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: response }) // Assuming your summary API accepts JSON with a 'text' field
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError(error.message || 'An unknown error occurred while fetching summary.');
    }
  }

  function handleInput(e) {
    setAudio(e.target.files[0]);
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", audio);

    try {
      const response = await fetch("http://3.234.221.228:8000/transcribe/", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError(error.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <input
        accept="audio/*"
        className={classes.fileInput}
        id="audio-file"
        type="file"
        onChange={handleInput}
      />
      <label htmlFor="audio-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.button}
        >
          Upload Audio File
        </Button>
      </label>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!audio || loading}
        className={classes.button}
      >
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>

      {loading && <CircularProgress className={classes.button} />}

      {error && <Typography variant="body1" color="error" className={classes.button}>
        Error: {error}
      </Typography>}

      <Typography variant="h5" className={classes.summary}>
        Result:
      </Typography>
      {response && (
        <Typography variant="body1">
          {JSON.stringify(response)}
        </Typography>
      )}

      {summary && (
        <div>
          <Typography variant="h5" className={classes.summary}>
            Summary:
          </Typography>
          <Typography variant="body1">
            {summary}
          </Typography>
        </div>
      )}
    </Container>
  );
}

export default Whisper;


//fresh




// import React, { useState } from 'react';

// const Whisper = () => {
//     const [audio, setAudio] = useState(null);
//     const [response, setResponse] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     function handleInput(e) {
//         setAudio(e.target.files[0]);
//     }

//     async function handleSubmit() {
//         setLoading(true);
//         setError(null);

//         const formData = new FormData();
//         formData.append("file", audio);

//         let timeoutId;

//         // Set up a manual timeout mechanism
//         const timeoutPromise = new Promise((resolve, reject) => {
//             timeoutId = setTimeout(() => {
//                 reject(new Error('Request timeout occurred. Please try again later.'));
//             }, 10 * 60 * 1000); // 10 minutes timeout
//         });

//         try {
//             // Combine fetch request with the timeout promise
//             const response = await Promise.race([
//                 fetch("https://s9g36m1m-8000.inc1.devtunnels.ms/transcribe/", {
//                     method: "POST",
//                     body: formData
//                 }),
//                 timeoutPromise
//             ]);

//             clearTimeout(timeoutId); // Clear the timeout since the request completed successfully

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             setResponse(data);
//         } catch (error) {
//             console.error('Error uploading audio:', error);
//             setError(error.message || 'An unknown error occurred.');
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div>
//             <input type='file' onChange={handleInput}></input>
//             <button onClick={handleSubmit}>Submit</button>

//             {loading && <div>Loading...</div>}
//             {error && <div>Error: {error}</div>}

//             <h3>Result:</h3>
//             <p>{JSON.stringify(response)}</p>
//         </div>
//     );
// }

// export default Whisper;



// import React, { useState } from 'react';

// const Whisper = () => {
//     const [audio, setAudio] = useState(null);
//     const [response, setResponse] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     function handleInput(e) {
//         setAudio(e.target.files[0]);
//     }

//     async function fetchWithTimeout(resource, options = {}, timeout = 120000) { // timeout in milliseconds
//         const controller = new AbortController();
//         const id = setTimeout(() => controller.abort(), timeout);
//         try {
//             const response = await fetch(resource, {
//                 ...options,
//                 signal: controller.signal
//             });
//             clearTimeout(id);
//             if (!response.ok) {
//                 throw new Error(`Network response was not ok (${response.status})`);
//             }
//             return response;
//         } catch (error) {
//             if (error.name === 'AbortError') {
//                 throw new Error('Request timed out');
//             } else {
//                 throw error;
//             }
//         }
//     }

//     async function handleSubmit() {
//         setLoading(true);
//         setError(null);

//         const formData = new FormData();
//         formData.append("file", audio);

//         try {
//             const response = await fetchWithTimeout("https://s9g36m1m-8000.inc1.devtunnels.ms/transcribe/", {
//                 method: "POST",
//                 body: formData,
//             }, 120000);

//             const data = await response.json();
//             setResponse(data);
//         } catch (error) {
//             setError(error.message || 'An unknown error occurred.');
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div>
//             <input type='file' onChange={handleInput}></input>
//             <button onClick={handleSubmit}>Submit</button>

//             {loading && <div>Loading...</div>}
//             {error && <div>Error: {error}</div>}

//             <h3>Result:</h3>
//             <p>{JSON.stringify(response)}</p>
//         </div>
//     );
// }

// export default Whisper;
