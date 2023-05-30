import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';

import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.styles';

type CategoryRouteParams = {
    category: string;
}

const Category = () => {

    const { category } = useParams<
    keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    // use categoriesMap[category] in place of empty array
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {
                isLoading ? <Spinner/> : 
            (
            <CategoryContainer>
            {// short circuit operator as safeguard
                products && products.map((product) => (
               <ProductCard key={product.id} product={product} />
               ))}
            </CategoryContainer>

                )
            }
        </Fragment>
    );
};

export default Category;