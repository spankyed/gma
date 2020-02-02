import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"
import  Add  from "./add"

export default initial => ({
  state: {
    products: initial,
    image: {},
    images: [],
    ...Add.state
  },
  actions: {
    delete: (evt) => state => ({ cat: 'meow' }),
    ...Add.actions
  },
  view: (state, actions) => ({match}) => {
    const AddModal = Add.view
    return (     
      <div class={`${state.show && "modal-active h-full"} text-gray-400 bg-black-alt w-full pt-16 justify-center`}>
        {
          (state.show && <AddModal state={state} actions={actions}/>)
        }
          <div class="flex w-full">
            <div class="w-1/3 md:w-1/6 border border-gray-800 bg-gray-900">
              <div class="border-b border-gray-800 px-2 pt-2 pb-1">
                <label class="text-gray-500 hidden xl:inline tracking-wide text-sm pr-2 font-semibold mb-2" for="collection">
                  Order By
                </label>
                <select class="appearance-none bg-gray-600 border border-gray-800 pl-1" id="collection">
                  <option>Featured</option>
                  <option>Price-low to high</option>
                  <option>Price-high to low</option>
                </select>
              </div>
              <div class="text-gray-500 px-2 pt-1 font-medium">Collections</div>
              <div class="text-gray-600 px-2 py-1">
                <input type="checkbox" name="" value="" id="collection_1"></input>
                <i class="a-icon a-icon-checkbox"></i>
                <label for="collection_1">
                  <span class="px-1">Dresses</span>
                </label>
              </div>
              <div class="text-gray-600 px-2 py-1">
                <input type="checkbox" name="" value="" id="collection_1"></input>
                <label for="collection_1">
                  <span class="px-1">Glassware</span>
                </label>
              </div>
            </div>
            <div class="w-2/3 md:w-5/6 w-full flex flex-wrap leading-normal">
              <div class="flex-none flex w-full border-b border-gray-800">
                <div class="flex-grow bg-gray-700">
                  <input class="font-semibold appearance-none block w-full h-full text-gray-400 bg-gray-600 px-4" id="search" type="text" placeholder="Search"></input>
                </div>
                <div class="flex-grow-0">
                  <button class="float-right bg-yellow-700 hover:bg-yellow-900 text-white font-normal py-2 px-4" onclick={actions.toggleAdd}>
                    Publish
                    <svg class="text-white fill-current inline -mt-1 ml-2" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15L17 7 15 7 15 15 7 15 7 17 15 17 15 25 17 25 17 17 25 17 25 15 17 15z"></path></svg>
                  </button>
                  <button class="float-right bg-pink-700 hover:bg-pink-900 text-white font-normal py-2 px-3" onclick={actions.toggleAdd}>
                    Add
                    <svg class="text-white fill-current inline -mt-1 ml-2" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15L17 7 15 7 15 15 7 15 7 17 15 17 15 25 17 25 17 17 25 17 25 15 17 15z"></path></svg>
                  </button>
                </div>
              </div>

              <div class="w-full flex flex-wrap ">
              {
                [...new Array(10)].map((item, index) => (
                <div class={`${!(index % 2) && "bg-gray-900"} w-full md:w-1/3 xl:w-1/5 border-r text-gray-400 border-gray-800`}>
                  <div class="bg-cover bg-center h-56 relative" style="background-image: url(https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg)">
                    <div class="bottom-0 absolute">
                      <div class="font-semibold bg-gray-700 px-1">
                        28
                        <svg class="ml-2 h-6 text-pink-700 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div class="pt-1 px-2">
                    <div class="font-semibold uppercase tracking-wide">
                      <a href="url" class="hover:underline"> Fourth of July Baby Outfit </a>
                    </div>
                    <div class="float-right font-medium mb-2 inline-block">$<span class="tracking-wider text-pink-600 bg-gray-700 ml-1 px-2"> 26.99</span> </div>
                  </div>  
                </div>

                ))
              }
              </div>

            </div>
          </div> 
      </div>
      ) 
  }
});
/* switch might eliminate coniditional
<Switch></Switch>
*/




