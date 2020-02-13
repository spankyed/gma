import { h } from 'hyperapp';
import { Link, Route } from "@hyperapp/router"
import  Add  from "./add"
import  Assign  from "./assign"

export default initial => ({
  state: {
    showActions: false,
    collections: initial,
    ...Add.state,
    ...Assign.state
  },
  actions: {
    delete: (evt) => state => ({ cat: 'meow' }),
    view: (evt) => state => ({ cat: 'meow' }),
    toggleActions: _ => state => ({showActions: !state.showActions}),
    ...Add.actions,
    ...Assign.actions,
  },
  view: (state, actions) => ({match}) => {
    const AddModal = Add.view
    const AssignModal = Assign.view
    return (     
      <div class={`${state.show && "modal-active"} max-w-6xl w-full mx-auto h-screen md:px-5 pt-16 justify-center overflow-x-auto`}>
        {
          (state.showAdd && <AddModal state={state} actions={actions}/>)
        }
        {
          (state.showAssign && <AssignModal state={state} actions={actions}/>)
        }
        <div class="flex flex-col min-w-full shadow overflow-hidden border border-l border-r border-gray-800 text-sm bg-gray-900 text-gray-100">
            <div class="inline-block md:min-w-full w-full xs:mt-0">
                <div class="float-right text-sm text-white border-b border-gray-800 font-normal">
                    <button onclick={actions.toggleAdd} class="bg-blue-700 hover:bg-blue-800 py-2 px-4 ">
                        Add
                    </button>
                    <button onclick={actions.toggleAssign} class="bg-pink-700 hover:bg-pink-800 py-2 px-4 ">
                        Assign
                    </button>
                </div>
            </div>
            <table class="min-w-full leading-normal text-gray-100">
                <thead>
                    <tr>
                        <th
                            class="px-4 py-3 border-b-2 border-gray-800 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Title
                        </th>
                        <th
                            class="px-4 py-3 border-b-2 border-gray-800 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Items
                        </th>
                        <th
                            class="hidden sm:table-cell px-4 py-3 border-b-2 border-gray-800 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Created 
                        </th>
                        <th
                            class="px-4 py-3 border-b-2 border-gray-800 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                        </th>
                        <th
                            class="w-12 px-5 py-3 border-b-2 border-gray-800 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="px-4 py-5 border-b border-gray-800">
                            <div class="flex items-center">
                                <p class="whitespace-no-wrap text-lg">Dresses</p>
                            </div>
                        </td>
                        <td class="px-4 py-5 border-b border-gray-800">
                            <p class="whitespace-no-wrap">28</p>
                        </td>
                        <td class="hidden sm:table-cell px-5 py-5 border-b border-gray-800">
                            <p class="whitespace-no-wrap">Jan 21, 2020</p>
                        </td>
                        <td class="px-4 py-5 border-b border-gray-800">
                            <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span aria-hidden
                                    class="absolute inset-0 bg-green-200 opacity-75"></span>
                                <span class="relative">Active</span>
                            </span>
                        </td>
                        <td class=" pl-4 py-5 border-b border-gray-800">
                          <button onclick={actions.toggleActions} class={`text-sm bg-black-alt ${state.showActions && 'bg-gray-800'} hover:bg-gray-800 border border-gray-800 text-white font-normal py-2 px-4`}>
                            <i class="fas fa-tools"></i>
                          </button>
                          <span id="actions" class={`${!state.showActions && 'hidden'} absolute inline-block flex flex-col`}>
                            <button class="text-sm flex-initial bg-black-alt hover:bg-gray-800 border border-gray-800 text-white font-normal py-2 px-4 ">
                                <i class="fa fa-eye" aria-hidden="true"></i>
                            </button>
                            <button class="text-sm flex-initial bg-black-alt hover:bg-gray-800 border border-gray-800 text-white font-normal py-2 px-4 ">
                            <i class="fas fa-tasks"></i>
                            </button>
                            <button class="text-sm flex-initial bg-black-alt hover:bg-gray-800 border border-gray-800 text-white font-normal py-2 px-4 ">
                                <i class="fa fa-trash"></i>
                            </button>
                          </span>
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




