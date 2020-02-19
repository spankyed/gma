import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"

export default initial => ({
  state: {
    tasks: initial
  },
  actions: {
    increment: (evt) => state => ({ cat: 'meow' }),
  },
  view: (state, actions) => ({match}) => {
    return (
      <div class="px-5 max-w-6xl w-full mx-auto h-screen pt-16 justify-center">
        <div class="flex flex-col min-w-full shadow overflow-hidden text-gray-100">
          <div class="inline-block md:min-w-full w-full xs:mt-0">
            <div class="float-right w-full text-white border-b border-gray-800 font-normal">
              <input placeholder="Add a new task" type="text" id="js-input-field" class="h-full pt-2 px-4 bg-black-alt text-white w-4/5 shadow-inner outline-none"/>
              <div class="md:flex-grow-0 w-1/5 inline">
                <button onclick={actions.toggleAdd} class="float-right bg-green-700 hover:bg-green-800 py-2 px-3">
                    <span class="hidden md:inline-block">Add</span>
                    <i fill="currentcolor" class="fas fa-plus ml-1 text-gray-800"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <ul id="js-list" class="m-0 my-4 p-0 list-none w-full"> 
          <span class="text-center inline-block w-full p-2 text-gray-300">Add a task and get started!</span>
          {
            [...new Array(3)].map((item, index) => (
              <li class="todo-item active" data-id="0"><span class="w-full m-0 py-2 px-4 text-gray-100 flex border-r border-t border-b border-gray-800 cursor-pointer mb-1 bg-gray-900">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></li>
            ))
          }
        </ul>
        <div class="flex py-2 border-t border-gray-600 justify-between">
        <div>
            <button id="js-filter-all" class="text-sm mr-3 font-bold hover:underline text-gray-500 text-green-500 focus:outline-none">All</button>
          <button id="js-filter-active" class="text-sm mr-3 hover:underline text-gray-500 focus:outline-none">Active</button>
        </div>
        <div>
            <button id="js-filter-clear" class="text-sm mr-3 text-red-500 focus:outline-none hover:underline">Clear</button>
        </div>
        </div>
      </div>
    )
  }
});
/* switch might eliminate coniditional
<Switch></Switch>
*/




