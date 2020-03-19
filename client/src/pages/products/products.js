import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"
import  Add  from "./add"
import  fetch  from "../../functions/fetch"

export default initial => ({
  state: {
    products: initial,
    collections: [],
    filter: '',
    query: '',
    products: [],
    currPage: 1,
    pageCount: 0,
    ...Add.state
  },
  actions: {
    delete: (evt) => state => ({ cat: 'meow' }),
    setFilter: collection => ({ filter: collection }),
    removeFilter: collection => ({ filter: ''}),
    setCollections: ({collections}) => ({ collections: collections }),
    getCollections: _ => (state, actions) => fetch.getCollections().then(actions.setCollections),
    getProducts: _ => ({query, currPage}, actions) => fetch.getFilteredProductsByPage(query,currPage).then(actions.setProducts),    
    setProducts: ({products, count}) => ({ products: products, pageCount: Math.ceil(count / 10) }),
    input: value => value,
    ...Add.actions
  },
  view: (state, actions) => ({match}) => {
    const AddModal = Add.view
    const query = (e) => { actions.input({ query: e.target.value}); actions.getProducts() }
    const setup = (e) => { actions.getCollections(); actions.getProducts() }
    const toggleFilter = (collection) => (e) => { 
      state.filter == collection.title ? 
      actions.removeFilter(collection.title) : actions.setFilter(collection.title)
    }
    //const getNextPage = (e) => { actions.incrementPage(); actions.getProducts() }
    //const getPrevPage = _ => { actions.decrementPage(); actions.getProducts() }  
    if(!match.isExact){ // change location url to /products
      console.log(match,match.params)
      //actions.setFilter(match.params.collection)
      //filterCollection: collection => ({ collection: collection }),
    } 
    return (     
      <div class={`${state.showAdd && "modal-active h-full"} text-gray-400 bg-gray-900 w-full h-full pt-16 justify-center`}>
        {
          (state.showAdd && <AddModal state={state} actions={actions}/>)
        }
        <div class="flex w-full">
          <div class="w-collection border border-gray-800 bg-gray-900">
            <div class="border-b border-gray-800 px-2 pt-2 pb-1">
              <label class="text-gray-500 tracking-wide text-sm pr-2 font-semibold mb-2" for="collection">
                Order
              </label>
              <select class="appearance-none bg-black-alt border border-gray-700 px-2" id="collection">
                <option>Featured</option>
                <option>Cheap</option>
                <option>Expensive</option>
              </select>
            </div>
            <div class="text-gray-500 px-2 pt-1 font-medium">Collections</div>

            <div>
              {
                state.collections.map((collection, index) => (
                  <div class="text-gray-600 pl-4 py-1">                    
                    <i class="a-icon a-icon-checkbox"></i>
                    <label for="collection_1">
                      <span onclick={toggleFilter(collection)} class={`${state.filter == collection.title && "text-gray-300"} px-1 cursor-pointer`}>{collection.title}</span>
                    </label>
                  </div>
                ))
              }
            </div>
          </div>
          <div class="w-full flex flex-wrap leading-normal">
            <div class="flex w-full border-b border-gray-800 bg-black-alt">
              {/* Search input */}
              <div class="flex-grow bg-gray-700 ">
                <input value={state.query} oninput={e => query(e)} class="appearance-none block w-full h-full text-white bg-black-alt px-4 shadow-inner outline-none" id="search" type="text" placeholder="Search"></input>
              </div>
              <div class="flex-grow-0 inline">
                <button class="float-right bg-pink-700 hover:bg-pink-900 text-white font-normal py-2 px-4" onclick={actions.toggleAdd}>
                  <span class="hidden md:inline-block">Publish</span>
                  <i fill="currentcolor" class="fas fa-upload ml-1 text-gray-800"></i>
                </button>
                <button class="float-right bg-green-700 hover:bg-green-900 text-white font-normal py-2 px-4" onclick={actions.toggleAdd}>
                  <span class="hidden md:inline-block">Add</span>
                  <i fill="currentcolor" class="fas fa-plus ml-1 text-gray-800"></i>
                </button>
              </div>
            </div>
          {/* Show loader while fetching */}
            <div oncreate={setup} class="w-full h-full flex flex-wrap bg-gray-900">
            {
              filterProductsByCollection(state).map((product, index) => (
              <div class={`bg-gray-900 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 border-r border-b text-gray-400 border-gray-800`}>
                <div class="bg-cover bg-center h-56 relative" style="background-image: url(https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg)">
                  <div class="bottom-0 absolute">
                    <div class="font-semibold bg-gray-900 border-r border-t border-gray-700 px-1 -py-1">
                      28
                      <svg class="ml-2 h-6 text-pink-500 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-800 px-2">
                  <div class="font-semibold uppercase tracking-wide">
                    <a href="url" class="hover:underline"> {product.description} </a>
                  </div>
                  <div class="float-right font-medium mb-2 inline-block">$<span class="tracking-wider text-pink-300 bg-black-alt border border-gray-700 ml-1 px-2 cursor-default">{product.price}</span> </div>
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

function filterProductsByCollection (state){
  if (state.filter == '') return state.products
  console.log(state.products)
  let products = state.products
                        .filter((p) => p.collection == state.filter)
                        //.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  return products // []
} 

/* 
function collectionIsFilter (filters, collection){
 return filters.some((filter)=> filter == collection)
}
*/




