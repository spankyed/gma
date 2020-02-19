import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"

export default initial => ({
  state: {
    messages: initial
  },
  actions: {
    increment: (evt) => state => ({ cat: 'meow' }),
  },
  view: (state, actions) => ({match}) => {
    return (
        <div class={`${state.show && "modal-active"} max-w-6xl w-full mx-auto h-screen md:px-5 pt-16 justify-center`}>
        {
          (state.showAdd && <AddModal state={state} actions={actions}/>)
        }
            <div class="flex flex-col min-w-full shadow overflow-hidden text-gray-100">
                <div class="inline-block md:min-w-full w-full xs:mt-0">
                    <div class="float-right w-full text-white border-b border-gray-800 font-normal">
                    <input placeholder="Search" type="text" class="h-full pt-2 px-4 bg-black-alt text-white w-4/5 shadow-inner outline-none"/>
                    <div class="md:flex-grow-0 w-1/5 inline">
                    <button onclick={actions.toggleAssign} class="float-right bg-red-700 hover:bg-red-800 py-2 px-3">                  
                        <span class="hidden md:inline-block">Options</span>
                        <svg class="inline" fill="currentcolor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                    </button>
                    </div>
                    </div>
                </div>
                <div class="w-full flex flex-col items-center">
                {
                    [...new Array(3)].map((item, index) => (
                        <div class="w-full py-2 flex-1">
                            <div class="w-full bg-gray-900 border border-gray-800">
                            <div class="ml-4 flex items-bottom bg-gray-900 justify-between">
                                <p class="pt-2 text-gray-500 font-semibold">
                                    New Movie! Expendables 4
                                </p>
                                <div class="flex justify-center mb-2">
                                    <div class="py-1 px-3" style="background-color: #DDECF2">
                                        <p class="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">                         
                                            February 20, 2018 12:45 pm
                                        </p>
                                    </div>
                                </div>

                            </div>
                            <p class="ml-4 py-2 text-gray-300 mt-1 text-sm">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                            </div>

                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
  }
});
/* switch might eliminate coniditional
<Switch></Switch>
*/




