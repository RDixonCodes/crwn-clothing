import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { DirectoryCategory } from '../directory/directory.component'

import { DirectoryItemContainer, DirectoryItemBody, BackgroundImage } from "./directory-item.styles";

type DirectoryItemProps = {
  category: DirectoryCategory;
}

//destructure category
const DirectoryItem: FC<DirectoryItemProps> = ({category: {title, imageUrl, route}}) => {
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