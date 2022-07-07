const app = Vue.createApp({
    data() {
        return {
            product: 'Shoes',
            brand: 'SE 331',
            inventory: 100,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
            ],
            selectedVariant: 0,
            cart: ['2234: 0'],
            cart2: ['2235: 0'],
            onSale: true,
            premium: true,
            countF: 0,
            countS: 0,
        }
    },
    methods: {
        updateCart(id) {
            if (id == 2234) {
                this.countF += 1;
                this.cart.splice(0);
                this.cart.push(id + ': ' + this.countF);

            } else if (id == 2235) {
                this.countS += 1;
                this.cart2.splice(0);
                this.cart2.push(id + ': ' + this.countS);
            }   
        },
        clearCart(){
            this.cart.splice(0);
            this.cart.push('2234: 0');
            this.cart2.splice(0);
            this.cart2.push('2235: 0');
        }
    }
})