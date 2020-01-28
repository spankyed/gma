import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"
import  Add  from "./add"

export default initial => ({
  state: {
    products: initial,
    image: {},
    images: [],
    show: false,
    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    ...Add.state
  },
  actions: {
    delete: (evt) => state => ({ cat: 'meow' }),
    toggleAdd: _ => state => ({show: !state.show}),
    preview: (evt) => state => ({ src: URL.createObjectURL(evt.target.files[0]) }),
    ...Add.actions
  },
  view: (state, actions) => ({match}) => {
    //const AddModal = Add.view(state.tasks, actions.tasks)
    const show =false;
    return (     
      <div class={`${state.show && "modal-active"} w-full h-screen pt-16 justify-center`}>
        {
          (state.show && <Add state={state} actions={actions}/>)
        }
        <div>
          <div class="flex w-full -mb-1">
            <div class="w-3/12 bg-gray-100 px-2 py-2">
              <div class="pr-2">
                <label class="tracking-wide text-sm pr-2 font-normal mb-2" for="collection">
                  Order By
                </label>
                <select class="appearance-none text-grey-200 bg-grey-lighter border border-grey-lighter text-grey-darker pl-1 rounded" id="collection">
                  <option>Featured</option>
                  <option>Price-low to high</option>
                  <option>Price-high to low</option>
                </select>
              </div>
            </div>
            <div class="w-7/12 bg-gray-100 pr-2 border-l border-gray-400">
              <input class="appearance-none block w-full bg-grey-lighter text-grey-darker px-4 py-2" id="description" type="text" placeholder="Search"></input>
            </div>
            <div class="w-2/12 bg-gray-100">
              <button class="float-right bg-pink-700 hover:bg-pink-900 text-white font-normal py-2 px-3" onclick={actions.toggleAdd}>
                Add
                <svg class="text-white fill-current inline -mt-1 ml-2" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15L17 7 15 7 15 15 7 15 7 17 15 17 15 25 17 25 17 17 25 17 25 15 17 15z"></path></svg>
              </button>
              <button class="float-right bg-yellow-700 hover:bg-yellow-900 text-white font-normal py-2 px-4" onclick={actions.toggleAdd}>
                Publish
                <svg class="text-white fill-current inline -mt-1 ml-2" focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" aria-hidden="true"><path d="M17 15L17 7 15 7 15 15 7 15 7 17 15 17 15 25 17 25 17 17 25 17 25 15 17 15z"></path></svg>
              </button>
            </div>

          </div>

          <div class="flex w-full">
            <div class="w-1/3 md:w-1/6 border border-gray-400 bg-gray-100">
              <div class="px-2 pt-1 font-medium">Collections</div>
              <div class="px-2 py-1">
                <input type="checkbox" name="" value="" id="collection_1"></input>
                <i class="a-icon a-icon-checkbox"></i>
                <label for="collection_1">
                  <span class="px-1">Dresses</span>
                </label>
              </div>
              <div class="px-2 py-1">
                <input type="checkbox" name="" value="" id="collection_1"></input>
                <label for="collection_1">
                  <span class="px-1">Glassware</span>
                </label>
              </div>
            </div>
            <div class="w-2/3 md:w-5/6 bg-gray-100 w-full flex flex-wrap text-gray-800 leading-normal">
              {
                [...new Array(10)].map((item, index) => (

                <div class="w-full sm:w-1/3 lg:w-1/5 border-t border-r border-gray-400">
                  <div class="border-b border-gray-200 bg-cover bg-center h-56 p-2" style="background-image: url(https://m.media-amazon.com/images/G/01/Email2020/kidpik420x420._CB1579282967__AA210_.png)">
                    <div class="flex justify-end">
                        <svg class="h-6 w-6 text-green-800 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75zm7.07 7.07a4 4 0 1 0-5.66-5.66l-1.46 1.47a1 1 0 0 1-1.42 0L9.83 5.17a4 4 0 1 0-5.66 5.66L12 18.66l7.83-7.83z"></path>
                        </svg>
                    </div>
                  </div>

                  <div class="mt-2 px-2">
                    <div class="font-semibold text-gray-700 uppercase tracking-wide">
                      <a href="url" class="hover:underline"> Fourth of July Baby Outfit </a>
                    </div>
                    <div class="mb-2 font-medium text-red-600"> $26.99 </div>
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




