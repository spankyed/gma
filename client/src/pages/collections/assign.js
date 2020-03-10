import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"
import  fetch  from "../../functions/fetch"
import  validate  from "../../functions/validate"

let initial = {
  showAssign: false,
  collection: { id: "1" }, // id must be string to set initial value
  form: null,
  preview: { id: 0, src: "https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg" },
  query: '',
  products: [],
  selected: [],
  currPage: 1,
  pageCount: 0,
  ...validate.state  
}
 
export default (initial => ({
  state: initial,
  actions: {
    toggleAssign: collection => state => ({...initial, showAssign: !state.showAssign, collection: collection || initial.collection}),
    setCollection: collection => ({ collection: collection }),
    getCollections: _ => (state, actions) => fetch.getCollections().then(actions.setCollections),
    setCollections: ({collections}) => ({ collections: collections }),
    getProducts: _ => ({query, currPage}, actions) => fetch.getFilteredProductsByPage(query,currPage).then(actions.setProducts),    
    setProducts: ({products, count}) => ({ products: products, pageCount: Math.ceil(count / 4) }), // fn passed server response {products, count,...}
    preview: (product) => state => ({preview: { id: product.id, src:  product.image }}),
    select: product => state => ({selected:[...state.selected, product]}),
    deselect: product => state => ({selected: state.selected.filter(selected=>selected.id !== product.id)}),
    incrementPage: _ => state => ({currPage: state.currPage + 1}),
    decrementPage: _ => state => ({currPage: state.currPage - 1}),
    input: value => value,
    ...validate.actions
  },
  view: ({state, actions, alert}) =>_=> {
    const query = (e) => { actions.input({ query: e.target.value}); actions.getProducts() } // consider clearing missing products from selected after query
    const preview = (product) => { actions.preview(product); console.log(state.preview)} 
    const getNextPage = (e) => { actions.incrementPage(); actions.getProducts() }
    const getPrevPage = _ => { actions.decrementPage(); actions.getProducts() }  
    const boolSelected = (product) => state.selected.some((s)=>s.id==product.id)
    const toggleSelect = (product) => ((boolSelected(product)) ? actions.deselect(product) : actions.select(product)) // returns altered selected list
    const onTrClick =  (product) => {
      let selected = toggleSelect(product)
      if(state.submitAttempted) validate.check(selected, state, actions) // only validate onTrClick after first submit attempt
    }
    async function submit(){  
      if(validate.check({selected: state.selected, option: state.collection.id}, state, actions, true)){
        console.log("gang_sht", collection.id)
      }
    }

    return (
      <div onclick={actions.toggleAssign} class="opac absolute w-full h-full top-0 left-0 pt-16 justify-center" style="z-index:9000;">
        <div class="w-full flex mx-auto text-gray-800 leading-normal max-w-6xl" >
          <form class="w-full relative" name="add" id="add" action="/upload" method="post" enctype="multipart/form-data">
            <div onclick={e=>e.stopPropagation()} class="static px-8 pt-6 pb-8 mb-4 bg-gray-900 border border-gray-800 rounded shadow md:flex flex-wrap">
              
              <div onclick={actions.toggleAssign} class="text-gray-300 opacity-75 absolute top-0 right-0 bg-gray-800 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              </div>

              <div class="flex flex-wrap h-full md:w-1/2 mx-auto mb-6 md:mb-0 text-right text-gray-700">
                <div class="w-full flex border-b border-gray-800 py-2 px-4 text-lg">
                  Collection 
                  <select oncreate={actions.getCollections} value={state.collection.id} onchange={(e)=>{actions.input({ collection:{ id: e.target.value }})}} class={`${state.errors.option && "border border-red-600"} ml-8 px-4 text-gray-400 bg-gray-600`} id="collection">
                    {
                      state.collections.map((collection, index) => (
                        <option value={collection.id}>{collection.title}</option>
                      ))
                    }
                  </select>
                  {(state.errors.option && <p class="px-4 mt-1 text-red-600 text-xs italic">Please select a collection</p>)}

                </div>
                <div class="w-full h-full md:h-auto ">
                  <div class="w-full h-64  bg-pink-700 relative" style={`background-image: url(${state.preview.src})`}>
                    <div class="top-0 right-0 absolute">
                      <div class="font-semibold bg-gray-800 border-l border-b border-gray-700 px-1 text-gray-600 px-2 py-1">
                        Preview
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="md:w-1/2 sm:px-6 text-gray-300">
                <div class="flex flex-wrap leading-normal">
                  {/* Search input */}
                  <div class="w-full flex border-b border-gray-800">
                    <input value={state.query} oninput={e => query(e)} class={` md:flex-grow appearance-none block w-full h-full text-white bg-black-alt px-4 shadow-inner outline-none`} id="search" type="text" placeholder="Search"></input>
                    <div class="md:flex-grow-0">
                      <button type="button" onclick={submit} class="bg-blue-700 hover:bg-blue-800 py-2 px-3 float-right">                  
                        <span class="">Assign</span>
                        <i fill="currentcolor" class="fas fa-link ml-1"></i>
                    </button>
                    </div>
                  </div>
                  <div class="w-full">
                    <table oncreate={()=>fetch.getFilteredProductsByPage('',1).then(actions.setProducts)} class="min-w-full leading-normal text-gray-100">
                      <tbody class={`${(state.errors.selected) && "border border-red-600"}`} >
                      {
                        state.products.map((product, index) => (
                          <tr onclick={(e)=>onTrClick(product)} class={`${(boolSelected(product)) && "bg-blue-800"} border-b ${(state.errors.selected && index==3)? "border-red-600":"border-gray-800"} hover:bg-blue-700`}>
                            <td class="px-4 py-4 text-center">
                              <button onclick={(e)=>{e.stopPropagation();actions.preview(product)}} type="button" class={`bg-black-alt ${(state.preview.id==product.id) && 'bg-gray-800'} hover:bg-gray-800 border border-gray-800 text-white text-sm font-normal py-2 px-4`}>
                                <i class="fas fa-eye"></i>
                              </button>
                            </td>
                            <td class="px-4 py-4">
                              <p class="whitespace-no-wrap">{product.description}</p>
                            </td>
                            <td class="hidden xl:table-cell px-4 py-5">
                              <p class="whitespace-no-wrap">{product.collection}</p>
                            </td>
                            <td class={`hidden sm:table-cell px-4 py-4`}>
                                <p class="whitespace-no-wrap">${product.price}</p>
                            </td>
                          </tr> 
                        ))
                      }         
                      </tbody>
                    </table>
                    <div class="w-full flex ">
                      <div class="w-1/5 ">
                        {(state.errors.selected && <p class="text-red-600 text-xs italic mb-1 absolute">Please select a product from the table </p>)}
                        {/* offset w-3/5 */}
                      </div>
                      <div class="w-2/5 flex items-center text-left justify-end">
                        page {state.currPage} of {state.pageCount}
                      </div>
                      <div class="w-2/5">
                        <button onclick={getNextPage} type='button' class={`float-right hover:bg-blue-900 text-white font-normal py-2 px-3 ${(state.currPage>=state.pageCount)?"bg-blue-900":"bg-blue-700"}`} disabled={(state.currPage>=state.pageCount)}>
                          <span class="">&gt;</span>
                        </button>
                        <button onclick={getPrevPage} type='button' class={`float-right hover:bg-blue-900 text-white font-normal py-2 px-3 ${(state.currPage<=1)?"bg-blue-900":"bg-blue-700"}`} disabled={(state.currPage<=1)}>
                          <span class="">&lt;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>  
      )   
  }
}))(initial)  



