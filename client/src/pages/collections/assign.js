import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"

export default {
  state: {
    form: null,
    showAssign: false,
    src: "https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg",
    fileName: 'No file selected'
  },
  actions: {
    toggleAssign: _ => state => ({showAssign: !state.showAssign}),
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
      <div onclick={actions.toggleAssign} class="opac absolute w-full h-full top-0 left-0 pt-16 justify-center" style="z-index:9000;">
        <div class="w-full flex mx-auto text-gray-800 leading-normal max-w-6xl" >
          <form  class="w-full relative" name="add" id="add" action="/upload" method="post" enctype="multipart/form-data">
            <div onclick={e=>e.stopPropagation()} class="static px-8 pt-6 pb-8 mb-4 bg-gray-900 border border-gray-800 rounded shadow md:flex flex-wrap">
              
              <div class="text-gray-300 opacity-75 absolute top-0 right-0 bg-gray-800 cursor-pointer" onclick={actions.toggleAssign}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              </div>

              <div class="flex flex-wrap h-full md:w-1/2 mx-auto mb-6 md:mb-0 text-right text-gray-700">
                <div class="w-full flex border-b border-gray-800 py-2 px-4 text-lg">
                  Collection 
                  <span class="pl-2 text-gray-400">Dresses</span>
                </div>
                <div class="w-full h-full md:h-auto ">
                  <div class="w-full h-64  bg-pink-700 relative" style={`background-image: url(${state.src})`}>
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
                    <input class="md:flex-grow appearance-none block w-full h-full text-white bg-black-alt px-4 shadow-inner outline-none" id="search" type="text" placeholder="Search"></input>
                    <div class="md:flex-grow-0">
                      <button onclick={actions.toggleAssign} class="bg-blue-700 hover:bg-blue-800 py-2 px-3 float-right">                  
                        <span class="">Assign</span>
                        <i fill="currentcolor" class="fas fa-link ml-1"></i>
                    </button>
                    </div>
                  </div>
                  <div class="w-full">
                    <table class="min-w-full leading-normal text-gray-100">
                      <tbody>
                      {
                        [...new Array(4)].map((item, index) => (
                          <tr class="hover:bg-blue-700">
                            <td class="px-4 py-4 border-b border-gray-800 text-right">
                              <button onclick={actions.toggleActions} class={`text-sm bg-black-alt ${state.showActions && 'bg-gray-800'} hover:bg-gray-800 border border-gray-800 text-white font-normal py-2 px-4`}>
                                <i class="fas fa-eye"></i>
                              </button>
                            </td>
                            <td class="px-4 py-4 border-b border-gray-800">
                              <p class="whitespace-no-wrap">Fourth of July Baby Outfit</p>
                            </td>
                            <td class="hidden xl:table-cell px-4 py-5 border-b border-gray-800">
                              <p class="whitespace-no-wrap">Dresses</p>
                            </td>
                            <td class="hidden sm:table-cell px-4 py-4 border-b border-gray-800">
                                <p class="whitespace-no-wrap">$9.99</p>
                            </td>
                          </tr> 
                        ))
                      }         
                      </tbody>
                    </table>
                    <div class="w-full flex ">
                      <div class="w-1/5">
                        {/* offset w-3/5 */}
                      </div>
                      <div class="w-2/5 flex items-center text-right justify-end">
                        page 1 of 4
                      </div>
                      <div class="w-2/5">
                        <button class="float-right bg-blue-700 hover:bg-blue-900 text-white font-normal py-2 px-3" onclick={actions.toggleAdd}>
                          <span class="">&gt;</span>
                        </button>
                        <button class="float-right bg-blue-700 hover:bg-blue-900 text-white font-normal py-2 px-3" onclick={actions.toggleAdd}>
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
}  



