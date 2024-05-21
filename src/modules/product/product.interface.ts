export type Variants = {
    type: string;
    value: string;
}

export type Inventory = {
    quantity: number;
    inStock: boolean
}

export type Product = {
    name: string;
    description:string;
    price: number;
    category: string;
    tags: 'computer' | 'peripherals' | 'wireless'| 'ergonomic'| 'portable' | 'audio' | 'speaker';
    variants: Variants, 
    inventory: Inventory
}