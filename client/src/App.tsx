import React, {useEffect, useState} from 'react';
import './App.css';
import {AppBar, Tab, Tabs, Typography} from "@material-ui/core";
import 'fontsource-roboto';
import {TabPanel} from "./TabPanel";
import {CityForm} from "./CityForm";
import {RoadForm} from "./RoadForm";


const App = () => {
    const [data, setData] = useState([{}]);
    const [value, setValue] = useState(0);

    useEffect(()=>{
        getData().then(r => console.log(r));
    }, [])

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
                  Route finder
              </Typography>
              <Tabs value={value} onChange={handleChange} centered>
                  <Tab label="Dodaj miasto" {...a11yProps(0)} />
                  <Tab label="Dodaj drogę" {...a11yProps(1)} />
                  <Tab label="Znajdź najszybszą drogę" {...a11yProps(2)} />
              </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
              <CityForm/>
          </TabPanel>
          <TabPanel value={value} index={1}>
              <RoadForm/>
          </TabPanel>
          <TabPanel value={value} index={2}>
              {JSON.stringify(data)}
          </TabPanel>



      </div>
  );
}

export default App;
