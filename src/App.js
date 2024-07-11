import './App.css';

import browse_img from "./static/browse.png";
import discover_img from "./static/discover.png";
import resources_img from "./static/resources.png";
import about_img from "./static/about.png";
import paw_print_img from "./static/paw_print.png"
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div className='title'>
          <h1>Welcome to Katsu!</h1>
        </div>
      </header>

      <div className = "navbar">
        <div className="navbar_element">
          <a href="/browse"><img src={browse_img} alt="Browse"></img></a>
        </div>

        <div className="navbar_element">
          <a href="/discover"><img src={discover_img} alt="Discover"></img></a>
        </div>

        <div className="navbar_element">
          <a href="/resources"><img src={resources_img} alt="Resources" ></img></a>
        </div>

        <div className="navbar_element">
          <a href="/about"><img src={about_img} alt="About"></img></a>
        </div>

      </div>

      <div className="content">
        <h2> Welcome to katsu! your very own one-stop-search site for cute cats!</h2>
        <h1>Look around to see for cool things or search for something!</h1>
        
        <RenderSearch></RenderSearch>
        
      </div>
    </div>
  );
}
// Render Search functionality
function RenderSearch() {
  const [query, setQuery] = useState("");

  // api root
  // const api_root = "https://e9d6-24-6-125-116.ngrok-free.app";
  const api_root = "http://172.16.0.36:8002/"
  // hooks needed for api call
  const [responseData, setData] = useState({});
  const [loading, setLoading] = useState(false);

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  function handleApi() {
    if (query == "") {
      return;
    }

    setLoading(true);
    let api_link = api_root + "/search/" + query;
    
    let headers = new Headers();
    headers.append('ngrok-skip-browser-warning', 'skip');
    // headers.append('Content-Type', 'application/json')

    fetch(api_link, {mode: 'cors', method: 'GET', headers: headers })
      .then(response => response.json())
      .then(data => {
        // Process the API response here
        console.log(data)
        console.log(JSON.stringify(data))
        setData(JSON.parse(JSON.stringify(data)));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setData("Error fetching Kitties :(")
        setLoading(false);
      });

  }

  return (
    <>
      <h1>Search</h1>
      {/* TEXTBOX: onChange, update query. onEnter, handleApi() */}
      <div className="search_wrapper">
        <input className='search_field' onChange={handleQueryChange} 
          onKeyDown={(e) => {
            if (e.key === "Enter")
                handleApi();
            }}  
          type="text" placeholder="small cat drinking pineapple juice..">

          </input>
          {/*SEARCH BTN: onClick, handleApi() */}
        <button className='search_btn' onClick={handleApi}><img src={paw_print_img}></img></button>
      </div>
      
      <h1>Results</h1>
        <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          // <div>{responseData.result}</div>
          <RenderSearchResults urls={responseData.result} size={200} root={api_root}></RenderSearchResults>
        )}
        </div>
    </>
  );
}

// INPUT list of IMG urls
// OUTPUT a group of <a> wrapped in div
function RenderSearchResults({urls, size, root}) {

  if (urls === undefined) {
    return;
  }
  console.log(root, "helo");
  const img_items = urls.map((url) => 
    <div className='result_element_outer'>
      <a className='result_element' href={root+url} target='_blank'>
      {/* crossOrigin="anonymous"  */}
        <img src={root+url} width={size} style={{verticalAlign: 'bottom'}} ></img>
      </a>
    </div>
    
  );

  return (
    <div className='result'>
      {/* <h1>Results</h1> */}
      {img_items}
    </div>
  );
}

export default App;
