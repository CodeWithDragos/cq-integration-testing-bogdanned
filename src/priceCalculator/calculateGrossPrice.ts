import { Product, ProductType } from "../types";

// applies different tax rates to different products
export default (prod:Product):number =>{
    if(prod.type === ProductType.EDUCATION){
        return prod.net_price;
    }else if(prod.type === ProductType.FOOD){
        return 1.1 * prod.net_price;
    }else{
        return 1.2 * prod.net_price;
    }
}
