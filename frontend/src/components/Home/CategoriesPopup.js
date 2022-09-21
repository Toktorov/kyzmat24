import React from 'react';

const CategoriesPopup = ({categories, setSelectedCategory, setSelectCategory, setCategory, items}) => {




    return (
        <div>
            <li className="has_popup2">
                <ul className="menu__popup2 space-y-20">
                    <div className="row sub_menu_row">

                        <div className="col-lg-6 space-y-10 category-popup-row">
                            <li>
                                <a href={"#"}
                                   onClick={(e)=>{
                                       e.preventDefault();
                                       setSelectCategory(false);
                                       setSelectedCategory(null)
                                   }}
                                   className="color_brand">

                                    <span> Все </span>
                                </a>
                            </li>
                            {
                                categories.map((item)=>{
                                    return <li>
                                        <a className="is_new" href="#"
                                           key={item.id}
                                           onClick={(e) => {
                                               e.preventDefault();
                                               setCategory(items.filter((element) => {
                                                   return element.user_category == item.id
                                               }));
                                               setSelectCategory(true);
                                               setSelectedCategory(item.id);
                                           }}
                                        >
                                            {item.content}
                                        </a>
                                    </li>
                                })
                            }

                        </div>
                    </div>
                </ul>
            </li>
        </div>
    );
};

export default CategoriesPopup;