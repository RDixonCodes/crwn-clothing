import './category-item.styles.scss';

//destructure category
const CategoryItem = ({category: {title, imageUrl}}) => {

    return (
        <div className="category-container">
        <div className="background-image"  style={{backgroundImage: `url(${imageUrl})`}}/>
        <div className="category-body-container">
          <h2>{title}</h2>
          <p>SHOP NOW</p>
        </div>
      </div>
    )
}

export default CategoryItem;