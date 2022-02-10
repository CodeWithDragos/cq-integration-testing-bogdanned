import priceCalculator from "../priceCalculator"
import {Brand, CartItem, Product, ProductType} from "../types"

describe('Price Calculator', () => {
    describe('given an empty cart', () => {
        it("return total prices with 0 values", () =>{
            const emptyCart = {
                items: [] as CartItem[]
            }
            const totalPrice = priceCalculator(emptyCart)
            expect(totalPrice).toEqual({
                net_price: 0,
                gross_price: 0,
                gross_price_discounted: 0
            })
        })
    })

    describe('given a cart with food products', () => {
        it("return total prices with 0 values", () =>{
            const foodBrand:Brand = {
                id: "food-brand",
                name: "Famous Food Brand"
            }
            const muffin:Product = {
                id: "id-muffin",
                name: "Chocolate Muffin",
                type: ProductType.FOOD,
                discount: {
                    isEnabled: false,
                    percentage: 0
                },
                brand: foodBrand,
                net_price: 10
            }
            const foodItem:CartItem = {
                product: muffin,
                quantity: 2
            }
            const foodCart = {
                items: [foodItem] as CartItem[]
            }
            const totalPrice = priceCalculator(foodCart)
            
            expect(totalPrice).toEqual({
                net_price: 20,
                gross_price: 20 * 1.1,
                gross_price_discounted: 20 * 1.1
            })
        })
    })
})
