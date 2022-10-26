import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getLocations} from "../../redux/reducers/item";

const Locations = ({setLocation, setEditSelect = () =>{}}) => {
    const dispatch = useDispatch();
    const [regions, setRegions] = useState([]);
    const [cities, setCities] = useState([]);
    const [filterCities, setFilterCities] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const locations = useSelector(s => s.item.locations);

    useEffect(()=>{
        dispatch(getLocations());
    },[dispatch]);
    useEffect(() => {
        setRegions(locations.filter((item) => {
            return !item.location_self
        }));
        setCities(locations.filter((item) => {
            return item.location_self
        }));
    }, [locations]);
    return (
        <div className="container123 space-y-10">
            <select className="form-select
			                                    custom-select" aria-label="Default
			                                    select example"

                    onChange={(e)=>{
                        if (`${e.target.value}` === "0"){
                            setLocation(null);
                            setSelectedRegion(null)
                        } else {
                            setLocation(e.target.value);
                            setEditSelect('location');
                            setSelectedRegion(e.target.value);
                            setFilterCities(cities.filter((item) => {
                                return `${item.location_self}` === `${e.target.value}`
                            }));
                        }
                    }}
            >
                <option value="0">Выбрать область</option>
                {
                    regions.map((item) => {
                        return <option key={item.id} value={item.id}>{item.title}</option>
                    })
                }

            </select>
            {
                selectedRegion ? <select
                    className="form-select
			                                    custom-select" aria-label="Default
			                                    select example"
                    name="" id="" defaultValue="0" onChange={(e) => {
                        if (`${e.target.value}` === '-1'){
                            setLocation(selectedRegion);
                        } else {
                            setLocation(e.target.value);
                            setEditSelect('location');
                        }
                }}>
                    <option disabled value="0">Выбрать город/район</option>
                    <option value="-1">Отмена</option>
                    {
                        filterCities.map((item) => {
                            return <option key={item.id} title={item.location_self}
                                           value={item.id}>{item.title}</option>
                        })
                    }
                </select> : ""
            }
        </div>
    );
};

export default Locations;