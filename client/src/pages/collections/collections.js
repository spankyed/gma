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
      
      <div class={`${state.show && "modal-active"} max-w-6xl w-full mx-auto h-screen pt-16 justify-center overflow-x-auto`}>
        {
          (state.show && <Add state={state} actions={actions}/>)
        }
        <div class="inline-block min-w-full shadow overflow-hidden">
            <div class="min-w-full w-full px-5 bg-white border-t flex inline-flex xs:mt-0">
              <button onclick={actions.toggleAdd} class="float-right text-sm bg-blue-700 hover:bg-blue-800 text-white font-normal py-2 px-4 ">
                  Add
              </button>
              <button onclick={actions.toggleAdd} class="float-right text-sm bg-pink-700 hover:bg-pink-800 text-white font-normal py-2 px-4 ">
                  Assign
              </button>
            </div>
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Title
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Items
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Created 
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div class="flex items-center">
                                <div class="flex-shrink-0 w-10 h-10">
                                    <img class="w-full h-full rounded-full"
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                        alt="" />
                                </div>
                                <div class="ml-3">
                                    <p class="text-gray-900 whitespace-no-wrap">
                                        Dresses
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">28</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">
                                Jan 21, 2020
                            </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span
                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span aria-hidden
                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                <span class="relative">Active</span>
                            </span>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button class="text-sm bg-pink-700 hover:bg-pink-800 text-white font-normal py-2 px-4 ">
                              +
                          </button>
                        </td>
                    </tr>
                    
                </tbody>
            </table>

        </div>
    </div>
      ) 
  }
});
/* switch might eliminate coniditional
<Switch></Switch>
*/




