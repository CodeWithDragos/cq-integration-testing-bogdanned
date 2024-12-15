import priceCalculator from "../priceCalculator"
import {Brand, CartItem, Product, ProductType} from "../types"
import { createMock } from 'ts-auto-mock';

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

    describe('Given a cart with two product', () => { 
        describe('When the first product has discount', () => { 
            describe('And the second product is of type REGULAR_GOODS', () => { 
                // Arrange 
                const firstProduct = createMock<Product>({
                    discount: {
                        isEnabled: true,
                        percentage: 50
                    },
                    type: ProductType.EDUCATION
                })
                
                const secondProduct = createMock<Product>({
                    type: ProductType.REGULAR_GOODS
                })

                const firstItem:CartItem = {
                    product: firstProduct,
                    quantity: 1
                }

                const secondItem:CartItem = {
                    product: secondProduct,
                    quantity: 1
                }
                const testCart = {
                    items: [secondItem, firstItem] as CartItem[]
                }

                it("The price is calculated correctly", () => {
                    const result = priceCalculator(testCart)
                    const net_price = firstProduct.net_price + secondProduct.net_price
                    const expectedResult = {
                        net_price,
                        gross_price: firstProduct.net_price + secondProduct.net_price * 1.2,
                        gross_price_discounted: firstProduct.net_price * 0.5 + secondProduct.net_price * 1.2
                    }
                    expect(result).toEqual(expectedResult)
                })
             })
         })
     })
})
