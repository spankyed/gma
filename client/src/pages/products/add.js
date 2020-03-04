import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"

export default {
  state: {
    form: null,
    showAdd: false,
    src: "https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg",
    fileName: 'No file selected'
  },
  actions: {
    toggleAdd: _ => state => ({showAdd: !state.showAdd}),
    preview: (evt) => state => ({ src: URL.createObjectURL(evt.target.files[0]), fileName: evt.target.files[0].name }),
  },
  view: ({state, actions}) =>_=> {
    
    async function submit(){
      state.form = new FormData();
      var files = document.getElementById('image').files,
          file;
      if(files.length > 0){
        files = file[0]
        console.log(file)
      }

      state.form.append('file', file);
      var elements = document.forms["add"].elements;
      for (var i=0; i < elements.length-2; i++){ //-2 for buttons
        state.form.append(elements[i].id, elements[i].value)
      }

      /*
      let response = await fetch('/products/add', {
        method: 'POST',
        body: state.form
      });
  
      let result = await response.json();
      console.log(result);*/
    }

    return (
      <div onclick={actions.toggleAdd} class="opac absolute w-full h-full top-0 left-0 pt-16 justify-center" style="z-index:9000;">
        <div class="w-full flex mx-auto text-gray-800 leading-normal max-w-6xl" >
          <form  class="w-full relative" name="add" id="add" action="/add" method="post" enctype="multipart/form-data">
            <div onclick={e=>e.stopPropagation()} class="static px-8 pt-6 pb-8 mb-4 bg-gray-900 border border-gray-800 rounded shadow md:flex flex-wrap">
              <div class="text-gray-300 opacity-75 absolute top-0 right-0 bg-gray-800 cursor-pointer" onclick={actions.toggleAdd}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              </div>
              <div class="h-64 md:h-auto md:w-1/2 mx-auto mb-6 md:mb-0 bg-pink-700" style={`background-image: url(${state.src})`}>
              </div>
              <div class="md:w-1/2 pl-6 text-gray-300">
                <div class='file-input w-56'>
                  <span class='button font-semibold border-b-4 border-blue-600'>Choose</span>
                  <input type='file' id="image" name="image" type='file' onchange={actions.preview} />   
                  <label class='label'>{state.fileName}</label>
                </div>

                <div class="px-3 mb-6">
                  <label class="block tracking-wide text-gray-300 text-sm font-bold mb-2" for="description">
                    Description
                  </label>
                  <input id="description" name="description" class="appearance-none block w-full bg-gray-600 border border-red-600 py-3 px-4 mb-3" type="text" placeholder="Description"></input>
                  <p class="text-red-600 text-xs italic">Please provide a product description.</p>
                </div>
                <div class="flex px-3 mb-6">
                  <div class="md:w-1/3 pr-2">
                    <label class="block tracking-wide text-gray-300 text-sm font-bold mb-2" for="price">
                      Price
                    </label>
                    <input id="price" name="price" type="number" placeholder="Price" class="appearance-none block w-full bg-gray-600 py-3 px-4"></input>
                  </div>
                  <div class="md:w-1/3 px-2">
                    <label class="block tracking-wide text-gray-300 text-sm font-bold mb-2" for="quantity">
                      Quantity
                    </label>
                    <input id="quantity" name="quantity" type="number" placeholder="Quantity" class="appearance-none block w-full bg-gray-600 py-3 px-4"></input>
                  </div>
                  <div class="md:w-1/3 px-2">
                    <label class="block tracking-wide text-gray-400 text-sm font-bold mb-2" for="size">
                      Size*
                    </label>
                    <input id="size" name="size" type="text" placeholder="Size" class="appearance-none block w-full bg-gray-600 py-3 px-4"></input>
                  </div>
                </div>
                <div class="flex px-3 mb-6">
                  <div class="w-1/3 pr-2">
                    <label class="block tracking-wide text-gray-400 text-sm font-bold mb-2" for="collection">
                      Collection
                    </label>
                    <div class="relative w-full">
                      <select class="block appearance-none w-full bg-gray-600 py-3 px-4 pr-8 " id="collection">
                        <option>Dresses</option>
                        <option>Glassware</option>
                        <option>Furniture</option>
                      </select>
                    </div>
                  </div>
                  <div class="w-2/3 flex text-gray-300 relative">
                    <div class="absolute bottom-0 w-full">
                      <div class="flex float-right">
                        <div class="w-1/2 px-2 text-center align-baseline">
                          <button type="button" onclick={actions.toggleAdd} class="bg-gray-600 font-semibold border-b-4 border-red-600 bg-red-500 hover:bg-red-600 hover:text-white shadow-md py-2 px-4 inline-flex items-center">
                            <span class="hidden lg:inline mr-2">Cancel</span>
                            <i fill="currentcolor" class="fas fa-times text-gray-800"></i>
                          </button>
                        </div>
                        <div class="w-1/2 px-2 text-center align-baseline">
                          {/* add outline to button */}
                          <button type="button" onclick={submit} class="bg-gray-600 font-semibold border-b-4 border-green-600 bg-green-500 hover:bg-green-600 hover:text-white shadow-md py-2 px-4 inline-flex items-end">
                            <span class="hidden lg:inline mr-2">Save</span>
                            <i fill="currentcolor" class="fas fa-save text-gray-800"></i>
                          </button>
                        </div>
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
}  



