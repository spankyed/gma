import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"

export default initial => ({
  state: {
    products: initial
  },
  actions: {
    delete: (evt) => state => ({ cat: 'meow' }),
  },
  view: (state, actions) => ({match}) => {


    return (
      <div class="container w-full mx-auto pt-20 justify-center max-w-6xl">
          <div class="relative w-full mt-10 flex md:mt-12 text-gray-800 leading-normal">
            <div class="w-full">
            <form action="/" method="post">
              <div>
                <label for="description">Description</label>
                <input type="text" name="description" id="description"  placeholder="Red bottoms.." class="form-input mt-1 block w-full"></input>
              </div>
              <div>
                <label for="size">Size</label>
                <input type="text" name="size" id="size"></input>
              </div>
              <div>
                <label for="price">Price</label>
                <input type="text" name="price" id="price"></input>
              </div>
              <div>
                <label for="quantity">Quantity</label>
                <input type="text" name="quantity" id="quantity"></input>
              </div>
              <button type="submit">Create Account</button>
            </form>
            </div>
          </div>
      </div>  
      ) 
  }
});
/* switch might eliminate coniditional
<Switch></Switch>
*/




