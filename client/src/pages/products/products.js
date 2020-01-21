import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"

export default initial => ({
  state: {
    products: initial,
    image: {},
    images: [],
    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
  },
  actions: {
    delete: (evt) => state => ({ cat: 'meow' }),
    preview: (evt) => state => ({ src: URL.createObjectURL(evt.target.files[0]) }),
  },
  view: (state, actions) => ({match}) => {
    return (
      <div class="container w-full mx-auto pt-20 justify-center max-w-6xl">
        <div class="w-full flex text-gray-800 leading-normal">
          <form class="w-full">
            <div class="bg-white shadow-md rounded md:flex px-8 pt-6 pb-8 mb-4 my-2">
              <div class="w-1/2 mx-auto mb-6 md:mb-0 bg-pink-600">
                <img id="preview" src={state.src} alt="Product Image" width="300" height="300"/>
              </div>
              <div class="md:w-1/2 pl-6">
                <div class="px-3 mb-6">
                  <input type='file' id="product_image" onchange={actions.preview}></input>
                </div>

                <div class="px-3 mb-6">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="description">
                      Description
                    </label>
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red-600 rounded py-3 px-4 mb-3" id="description" type="text" placeholder="Description"></input>
                    <p class="text-red-600 text-xs italic">Please provide a product description.</p>
                </div>

                <div class="flex px-3 mb-6">
                  <div class="md:w-1/3 pr-2">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="price">
                      Price
                    </label>
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="price" type="text" placeholder="Price"></input>
                  </div>
                  <div class="md:w-1/3 px-2">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="quantity">
                      Quantity
                    </label>
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="quantity" type="text" placeholder="Quantity"></input>
                  </div>
                  <div class="md:w-1/3 px-2">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="size">
                      Size
                    </label>
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="size" type="text" placeholder="Size"></input>
                  </div>
                </div>
                <div class="flex px-3 mb-6">
                  <div class="md:w-1/3 pr-2">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                      Collection
                    </label>
                    <div class="relative w-full">
                      <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
                        <option>Dresses</option>
                        <option>Glassware</option>
                        <option>Furniture</option>
                      </select>
                    </div>
                  </div>
                  <div class="md:w-1/3 px-2 text-center align-baseline">
                    {/* add outline to button */}
                    <button class="bg-white text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-end">
                      <span class="hidden md:inline mr-2">Save</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="md:w-1/3 px-2 text-center align-baseline">
                    <button class="bg-white text-gray-800 font-bold rounded border-b-2 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                      <span class="hidden md:inline mr-2">Cancel</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                      </svg>
                    </button>
                  </div>
                </div>


              </div>

            </div>
          </form>
        </div>
      </div>  
      )   
  }
});
/* switch might eliminate coniditional
<Switch></Switch>
*/




