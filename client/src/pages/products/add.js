import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"

export default {
  state: {
    form: null,
    show: false,
    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
  },
  actions: {
    toggleAdd: _ => state => ({show: !state.show}),
    preview: (evt) => state => ({ src: URL.createObjectURL(evt.target.files[0]) }),
  },
  view: ({state, actions}) =>_=> {
    
    async function submit(){
      state.form = new FormData();
      var file = document.getElementById('image').files[0];

      state.form.append('file', file, "product_image");
      var elements = document.forms["add"].elements;
      for (var i=0; i < elements.length; i++){
        state.form.append(elements[i].id, elements[i].value)
      }

      let response = await fetch('/products/upload', {
        method: 'POST',
        body: state.form
      });
  
      let result = await response.json();
      console.log(result);
      result.then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
      })
    }

    return (
      <div onclick={actions.toggleAdd} class="opac absolute w-full h-full top-0 left-0 pt-16 md:pt-20 justify-center">
        <div class="w-full flex mx-auto text-gray-800 leading-normal max-w-6xl" >
          <form name="add" id="add" action="/upload" method="post" enctype="multipart/form-data" class="w-full">
            <div onclick={e=>e.stopPropagation()} class="bg-gray-900 border border-gray-800 rounded shadow md:flex px-8 pt-6 pb-8 mb-4 my-2">
              <div class="w-1/2 mx-auto mb-6 md:mb-0 bg-pink-600">
                <img id="preview" src={state.src} alt="Product Image" width="300" height="300" class="max-w-full"/>
              </div>
              <div class="md:w-1/2 pl-6">
                <div class="px-1 mb-2 w-1/3 text-center font-bold rounded button bg-gray-100 hover:bg-gray-100 text-gray-900 cusor-pointer relative">
                  <input id="image" name="image" type='file' onchange={actions.preview} class="opacity-0 absolute pin-x pin-y"></input>
                  Select an Image            
                </div>

                <div class="px-3 mb-6">
                  <label class="block tracking-wide text-gray-400 text-sm font-bold mb-2" for="description">
                    Description
                  </label>
                  <input id="description" name="description" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red-600 rounded py-3 px-4 mb-3" type="text" placeholder="Description"></input>
                  <p class="text-red-600 text-xs italic">Please provide a product description.</p>
                </div>
                <div class="flex px-3 mb-6">
                  <div class="md:w-1/3 pr-2">
                    <label class="block tracking-wide text-gray-400 text-grey-darker text-sm font-bold mb-2" for="price">
                      Price
                    </label>
                    <input id="price" name="price" type="text" placeholder="Price" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"></input>
                  </div>
                  <div class="md:w-1/3 px-2">
                    <label class="block tracking-wide text-gray-400 text-sm font-bold mb-2" for="quantity">
                      Quantity
                    </label>
                    <input id="quantity" name="quantity" type="text" placeholder="Quantity" class="appearance-none block w-full bg-grey-lighter text-gray-700 border border-grey-lighter rounded py-3 px-4"></input>
                  </div>
                  <div class="md:w-1/3 px-2">
                    <label class="block tracking-wide text-gray-400 text-sm font-bold mb-2" for="size">
                      Size*
                    </label>
                    <input id="size" name="size" type="text" placeholder="Size" class="appearance-none block w-full bg-grey-lighter text-gray-900 border border-grey-lighter rounded py-3 px-4"></input>
                  </div>
                </div>
                <div class="flex px-3 mb-6">
                  <div class="md:w-1/3 pr-2">
                    <label class="block tracking-wide text-gray-400 text-sm font-bold mb-2" for="collection">
                      Collection
                    </label>
                    <div class="relative w-full">
                      <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="collection">
                        <option>Dresses</option>
                        <option>Glassware</option>
                        <option>Furniture</option>
                      </select>
                    </div>
                  </div>

                  <div class="md:w-1/3 px-2 text-center align-baseline">
                    <button class="bg-white text-gray-800 font-bold rounded border-b-4 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                      <span class="hidden md:inline mr-2">Cancel</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                      </svg>
                    </button>
                  </div>
                  <div class="md:w-1/3 px-2 text-center align-baseline">
                    {/* add outline to button */}
                    <button type="button" onclick={submit} class="bg-white text-gray-800 font-bold rounded border-b-4 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-end">
                      <span class="hidden md:inline mr-2">Add</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
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
}  



