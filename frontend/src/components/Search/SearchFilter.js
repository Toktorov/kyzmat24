import React, {useState} from 'react';

const   SearchFilter = ({findFilter,categories,setSelectedRegion,setFilterCities,cities,regions,selectedRegion,filterCities}) => {
    const [showBlock, setShowBlock] = useState(false);
    return (
        <>
            <button
                onClick={()=> setShowBlock(!showBlock)}
                className={'search-filter-block-btn'}>
                Добавить фильтра
            </button>
            <div className={
                !showBlock
                ? 'search-filter-block search-filter-block-hidden'
                    : 'search-filter-block search-filter-block-show'
            }>
            <div className="container123 space-y-10">
                <span className="nameInput">Категория</span>
                <select
                    onChange={(e)=>{
                        findFilter(e.target.value, "user_category")
                    }}
                    className="form-select
			                                    custom-select" aria-label="Default
			                                    select example">
                    <option value="0">Поиск по категории</option>
                    {
                        categories.map((item)=>{
                            return <option key={item.id} value={item.id}>{item.content}</option>
                        })
                    }

                </select>
            </div>
            <div className="container123 space-y-10">
                <span className="nameInput">Область</span>
                <select className="form-select
			                                    custom-select" aria-label="Default
			                                    select example"
                        onChange={(e)=>{
                            setSelectedRegion(e.target.value);
                            setFilterCities(cities.filter((item) => {
                                return `${item.location_self}` === `${e.target.value}`
                            }));

                        }}
                >
                    <option value="0">Поиски по области</option>
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

                        console.log(e.target.selectedOptions[0].title);
                        console.log(e.target.value);
                        findFilter(e.target.value, "user_location")
                    }}>
                        <option disabled value="0">Поиск по гододу/району</option>
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
            </div>
            </>
    );
};

export default SearchFilter;