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
      var file = document.getElementById('image').files[0];

      state.form.append('file', file, "product_image");
      var elements = document.forms["add"].elements;
      for (var i=0; i < elements.length-2; i++){ //-2 for buttons
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
      <div onclick={actions.toggleAdd} class="opac absolute w-full h-full top-0 left-0 pt-20 justify-center" style="z-index:9000;">
        <div class="w-full flex mx-auto text-gray-800 leading-normal max-w-6xl" >
          <form  class="w-full relative" name="add" id="add" action="/upload" method="post" enctype="multipart/form-data">
            <div onclick={e=>e.stopPropagation()} class=" mx-auto static px-8 pt-6 mb-4 bg-gray-900 border border-gray-800 rounded shadow md:flex flex-wrap">
              <div class="text-gray-300 opacity-75 absolute top-0 right-0 bg-gray-800 cursor-pointer" onclick={actions.toggleAdd}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              </div>
              <div class="flex flex-wrap px-3 mb-6 w-full">
                <div class="w-full sm:w-3/12 pr-2 text-gray-300">
                  <label class="block tracking-wide text-gray-300 text-sm font-bold mb-2" for="title">
                    Title
                  </label>
                  <input id="title" name="title" class="appearance-none block w-full bg-gray-600 border border-red-600 py-3 px-4 mb-3" type="text" placeholder="Title"></input>
                  <p class="text-red-600 text-xs italic">Please provide a collection title.</p>
                </div>
                <div class="w-full sm:w-4/12 sm:px-2">
                  <div class="mt-6 justify-center">
                    <button onclick={actions.toggleAdd} class="sm:float-right shadow-inner px-3 py-1 font-semibold text-green-900 leading-tight inset-0 bg-blue-300 hover:bg-blue-100  py-2 px-4  opacity-75">
                      Inactive
                    </button>
                    <button onclick={actions.toggleAdd} class="sm:float-right border-4 border-green-500 px-3 py-1 font-semibold text-green-900 leading-tight inset-0 bg-green-300 hover:bg-green-100  py-2 px-4  opacity-75">
                      Active
                    </button>
                  </div>
                </div>
                <div class="w-full sm:w-5/12 pr-2 mt-6">
                  <div class="float-right sm:text-center">
                    {/* add outline to button */}
                    <button type="button" onclick={actions.toggleAdd} class="mr-2 bg-gray-600 font-semibold border-b-4 border-red-600 bg-red-500 hover:bg-red-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                      <span class="hidden lg:inline mr-2">Cancel</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                      </svg>
                    </button>
                    <button type="button" onclick={submit} class="mx-2 bg-gray-600 font-semibold border-b-4 border-green-600 bg-green-500 hover:bg-green-600 hover:text-white shadow-md py-2 px-6 inline-flex items-end">
                      <span class="hidden lg:inline mr-2">Save</span>
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



