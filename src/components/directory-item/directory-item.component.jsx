import { DirectoryItemContainer, DirectoryItemBody, BackgroundImage } from "./directory-item.styles";

//destructure category
const DirectoryItem = ({category: {title, imageUrl}}) => {

    return (
        <DirectoryItemContainer>
        <BackgroundImage  imageUrl={imageUrl}/>
        <DirectoryItemBody>
          <h2>{title}</h2>
          <p>SHOP NOW</p>
        </DirectoryItemBody>
      </DirectoryItemContainer>
    )
}

export default DirectoryItem;