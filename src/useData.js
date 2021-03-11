import { useState, useEffect } from 'react';
import * as d3 from 'd3';

const populationCSV = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';


export const useData = () => {
	const [data, setData] = useState(null);
	
	useEffect(() => {

		const row = (d) => {
			//extract 2020 population
			d.Population = +d['2020'] * 1000;
			return d
		}

		d3.csv(populationCSV,row).then(data => {
			//either null before loaded or loaded data
			setData(data.slice(0,20));
		
		});

	}, []);
	
	return data
};

//const sepalCSV = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv';
const foodCSV = 'https://gist.githubusercontent.com/ankolaver/8528d706a813186e8c4ef917e42a1598/raw/c2ecb88896bebb704ab92ee8a0143d168cf9bee7/Food_Production.csv';

export const useFlower = () => {
    const [FoodData, setData] = useState(null);

    
    useEffect(() => {
      
      const row = (d) => {
        /*
		d.sepal_length = +d.sepal_length;
        d.sepal_width = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width = +d.petal_width;
		*/ 
		d["Land use change Kg CO2"] = +d["Land use change Kg CO2"];
		d["Animal Feed Kg CO2"] = +d["Animal Feed Kg CO2"];
		d["Farm Kg CO2"] = +d["Farm Kg CO2"];
		d["Processing Kg CO2"] = +d["Processing Kg CO2"];
		d["Transport Kg CO2"] = +d["Transport Kg CO2"];

        return d
      };
      
      d3.csv(foodCSV, row).then(setData);
      
    }, []);
    
    return FoodData
  };


//const temperatureUrl = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv';
//const sp500 = 'https://raw.githubusercontent.com/datasets/s-and-p-500/master/data/data.csv';
const sp500 = 'https://gist.githubusercontent.com/ankolaver/0786012f0ab1852bb633ab71f772c3bd/raw/540fed45478fea64e2ed9fafec59e9406cd3a371/gistfile1.csv';

export const useTemp = () => {
	const [tempdata, setData] = useState(null);
	
	useEffect(() => {
		const row = d => {
			/*
			d.temperature = +d.temperature;
			d.timestamp = new Date(d.timestamp);
			*/
			d.Date = new Date(d.Date);
			d.SP500 = +d.SP500;
			d["Consumer Price Index"] = +d["Consumer Price Index"];
			d["CPI-Percent"] = +d["CPI-Percent"];
			d["SP500-Percent"] = +d["SP500-Percent"];
			return d;
		};
		d3.csv(sp500, row).then(data => {
			setData(data.slice(1500));
		});
		//d3.csv(temperatureUrl, row).then(setData);
	}, []);

	return tempdata
};