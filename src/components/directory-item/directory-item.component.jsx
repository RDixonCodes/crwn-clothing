import { useNavigate } from "react-router-dom";

import { DirectoryItemContainer, DirectoryItemBody, BackgroundImage } from "./directory-item.styles";

//destructure category
const DirectoryItem = ({category: {title, imageUrl, route}}) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
        <BackgroundImage  imageUrl={imageUrl}/>
        <DirectoryItemBody>
          <h2>{title}</h2>
          <p>SHOP NOW</p>
        </DirectoryItemBody>
      </DirectoryItemContainer>
    )
}

export default DirectoryItem;