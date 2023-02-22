import { useContext } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";

import CategoryPreview from "../../category-preview/category-preview.components";

import "./shop.styles.scss";

//--------------------------------------------------------------------------

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div className="shop-container">
      {Object.keys(categoriesMap).map((key) => {
        const products = categoriesMap[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      })}
    </div>
  );
};

//--------------------------------------------------------------------------

export default Shop;
