app.component('product-display', {
    props:{
        premium: {
            type: Boolean,
            required: true
        }
    },

    template:
        /*html*/
        `<div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <img v-bind:src="image">
                </div>
                <div class="product-info">
                    <h1>{{ title }}</h1>

                    <p v-if="inStock">In stock</p>
                    <p v-else>Out of Stock</p>
                    <p>Shipping: {{ shipping }} </p>
                    <product-component :details="details"></product-component>

                    <div 
                        v-for="(variant, index) in variants" 
                        :key="variant.id"
                        @mouseover="updateVariant(index)"
                        class="color-circle"
                        :style="{ backgroundColor: variant.color}">
                    </div>

                    <button
                        class="button"
                        :class="{ disabledButton: !inStock}"
                        :disabled="!inStock"
                        v-on:click="addToCart">
                        Add to Cart
                    </button>

                    <button
                        class="button"
                        v-on:click="clearCart">
                        Clear Cart
                    </button>
                </div>
                    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
                    <review-form @review-submited="addReview"></review-form>
            </div>
        </div>`, 
        data() {
            return {
                product: 'Shoes',
                brand: 'SE 331',
                inventory: 100,
                details: ['50% cotton', '30% wool', '20% polyester'],
                variants: [
                    { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
                    { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 50 }
                ],
                activeClass: true,
                selectedVariant: 0,
                reviews:[],
                onSale: true,
    
            }
        },
        methods: {
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
            },
            updateImage(variantImage) {
                this.image = variantImage
            },
            clearCart() {
                this.$emit('clear-cart')
            },
            updateVariant(index){
                this.selectedVariant = index;
            },
            addReview(review) {
                this.reviews.push(review)
            }
        },
        computed: {
            title() {
                if(!this.onSale){
                    return this.brand + ' ' + this.product
                }
                return this.brand + ' ' + this.product + ' is on sale.'
            },
            image(){
                return this.variants[this.selectedVariant].image
            },
            inStock(){
                return this.variants[this.selectedVariant].quantity
            },
            shipping(){
                if(this.premium){
                    return 'Free'
                }
                return 30
            }
        }
})

app.component('product-component', {
    props:{
        details: {
            type: Array,
            required: true
        }
    },

    template: 
        /*html*/
        `<ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>`
})

app.component('review-form', {
    template:
        /*html*/
        `<form class="review-form" @submit.prevent="onSubmit">
            <h3>Leave a review</h3>
                <label for="name">Name:</label>

            <input id="name" v-model="name">

                <label for="review">Review:</label>  

                <textarea id="review" v-model="review"></textarea>
            
                <label for="rating">Rating:</label>

                <select id="rating" v-model.number="rating">

                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>

                </select>

                <label for="rec">Would you recommend this product?:</label>  

                <textarea id="rec" v-model="rec"></textarea>

            <input class="button" type="submit" value="Submit">
        </form>`,
        data() {
            return {
                name: '',
                review: '',
                rating: null,
                rec: '',
            }
        },
        methods: {
            onSubmit() {
                if (this.name === '' || this.review === '' || this.rating === null){
                    alert('Review is incomplete. Please fill out every field.')
                    return
                }

                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    rec: this.rec
                }
                this.$emit('review-submited', productReview)

                this.name = ''
                this.review = ''
                this.rating = null
                this.rec = ''
            }
        }
})                                   