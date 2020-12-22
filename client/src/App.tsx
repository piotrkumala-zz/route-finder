import React, {useEffect, useState} from 'react';
import './App.css';
import {AppBar, Tab, Tabs, Typography} from "@material-ui/core";
import 'fontsource-roboto';
import {TabPanel} from "./TabPanel";


const App = () => {
    const [data, setData] = useState([{}]);
    const [value, setValue] = useState(0);

    useEffect(()=>{
        getData().then(r => console.log(r));
    })

    const getData = async () => {
        const response = await fetch('https://localhost:5001/City');
        setData(await response.json());
    }
    const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
    };
    const a11yProps = (index: number) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

  return (
      <div className="App-header">

          <AppBar position="static">
              <Typography variant="h3" className="App">
                  News
              </Typography>
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
              Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
              Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
              <div>
                  {JSON.stringify(data)}
              </div>
          </TabPanel>



      </div>
  );
}

export default App;
