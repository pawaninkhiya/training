import React from "react";
import Button from "@material-ui/core/Button";
import { ProductTypes } from "../shared/typs";
import { Wrapper } from "./Item.Styles";

type Props = {
    item: ProductTypes;
    handleAddToCart: (clikedItem: ProductTypes) => void
};

const Item = ({ item, handleAddToCart }: Props) => {
    return (
        <Wrapper>
            <img src={item.image} alt="" />
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>{item.price}</h3>
            </div>
            <Button onClick={()=>handleAddToCart(item)}>ADD TO CART</Button>
        </Wrapper>
    )
};

export default Item;
