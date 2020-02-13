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
      <div class="px-5 max-w-6xl w-full mx-auto h-screen pt-16 justify-center overflow-x-auto">
        <div id="js-user-input" class="flex items-center justify-between relative">
          <input placeholder="Add new task" type="text" id="js-input-field" class="py-2 px-4 pr-20 border-b-2 border-gray-800 bg-black-alt text-white w-full shadow-inner outline-none"/>
          <button id="js-add-item" class="text-gray-300 bg-green-700 hover:bg-green-900 font-semibold py-2 px-4 absolute right-0 focus:outline-none">
            Add
          </button>
        </div>
        <ul id="js-list" class="m-0 my-4 p-0 list-none w-full"> 
          <span class="text-center inline-block w-full p-2 text-gray-300 text-sm">Add a task and get started!</span>
          <li class="todo-item active" data-id="0"><span class="w-full m-0 py-2 px-4 text-gray-100 flex border-r border-t border-b border-gray-800 cursor-pointer mb-1 bg-gray-900">test</span></li>
        </ul>
        <div class="flex py-2 border-t border-gray-600 justify-between">
        <div>
            <button id="js-filter-all" class="text-sm mr-3 font-bold hover:underline text-gray-500 text-green-500 focus:outline-none">All</button>
          <button id="js-filter-active" class="text-sm mr-3  hover:underline text-gray-500 focus:outline-none">Active</button>
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




