import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCategoriesMap } from '../../store/categories/category.selector';

import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles';

const Category = () => {

    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    // use categoriesMap[category] in place of empty array
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
            {
                // short circuit operator as safeguard
               products && 
               products.map((product) => (
               <ProductCard key={product.id} product={product} />
               ))}
            </CategoryContainer>
        </Fragment>
    )
}

export default Category;