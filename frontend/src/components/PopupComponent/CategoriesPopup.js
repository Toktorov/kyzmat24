import React, {useState} from 'react';
import './popupComponent.css';
import {useDispatch, useSelector} from "react-redux";
import {setListWithCategory, setShowListWithCategory} from "../../redux/reducers/app";


const CategoriesPopup = ({list, type}) => {
    const dispatch = useDispatch();
    const categories = useSelector((s) => s.item.categories);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showCategoryList, setShowCategoryList] = useState(false);

    return (
        <div className={"categories-component"}>
            <button
                onClick={() => {
                    setShowCategoryList(!showCategoryList)
                }}
                className="btn btn-primary btn-sm
											"
                type="button"

            >
                Категории
            </button>


                 <div className={showCategoryList ? 'categories-popup categories-popup-show'
                    : 'categories-popup'
                    }>
                        <button
                            className={selectedCategory === null
                                ? 'selected-category-button'
                                : ''
                            }
                            onClick={()=>{
                                dispatch(setListWithCategory());
                                dispatch(setShowListWithCategory(false));
                                setSelectedCategory(null);
                            }}
                            >

                            Все
                        </button>
                        {
                            categories.map((item)=>{
                                return  <button
                                    className={selectedCategory === item.id
                                    ? 'selected-category-button'
                                        : ''
                                    }
                                                key={item.id}
                                                onClick={() => {
                                                    dispatch(setListWithCategory(list, item.id, type));
                                                    dispatch(setShowListWithCategory(true));
                                                    setSelectedCategory(item.id);
                                                }}
                                >
                                    {item.content}
                                </button>

                            })
                        }
                    </div>


        </div>
    );
};

export default CategoriesPopup;