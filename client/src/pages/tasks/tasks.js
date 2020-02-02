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
      <div class="container mx-auto min-h-screen pt-20">
        <div id="js-user-input" class="flex items-center justify-between relative">
          <input
          placeholder="Add new item..."
          type="text"
          id="js-input-field"
          class="p-4 pr-20 border-t-2 border-green-500 rounded bg-gray-900 text-white w-full shadow-inner outline-none"/>
          <button id="js-add-item" class="text-green-400 hover:text-green-300 bg-gray-900 font-semibold py-2 px-4 absolute right-0 mr-2 focus:outline-none">
            Add
          </button>
        </div>
        <ul id="js-list" class="m-0 my-4 p-0 list-none w-full"> 
          <span class="text-center inline-block w-full p-4 text-gray-600 text-xs">Add a new item to get started!</span>
          <li class="todo-item active" data-id="0">test</li>
        </ul>
        <div class="flex py-4 border-t border-gray-600 justify-between">
        <div>
            <button id="js-filter-all" class="text-xs mr-3 font-bold hover:underline text-gray-500 text-green-500 focus:outline-none">All</button>
          <button id="js-filter-active" class="text-xs mr-3  hover:underline text-gray-500 focus:outline-none">Active</button>
        </div>
        <div>
            <button id="js-filter-clear" class="text-xs mr-3 text-red-500 focus:outline-none hover:underline">Clear</button>
        </div>
        </div>

      </div>

    )
  }
});
/* switch might eliminate coniditional
<Switch></Switch>
*/




