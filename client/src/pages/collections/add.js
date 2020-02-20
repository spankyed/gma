import { h } from 'hyperapp';
import  Alert  from '../../components/alert'

export default {
  state: {
    collection: {title: '', status: 0},
    form: null,
    showAdd: false
  },
  actions: {
    toggleAdd: _ => state => ({showAdd: !state.showAdd}),
    toggleActive: _ => state => ({collection: {...state.collection, status:1}}),
    toggleInactive: _ => state => ({collection: {...state.collection, status:0}}),
    input: value => value,
    ...Alert.actions
  },
  view: ({state, actions}) =>_=> {
    console.log(actions)
    actions.alert("wasuhhh")
    async function submit(){
      state.form = new FormData();
      /*
      var elements = document.forms["add"].elements;
      for (var i=0; i < elements.length-2; i++){ //-2 for buttons
        state.form.append(elements[i].id, elements[i].value)
      }*/

      //state.form.append('collection', state.collection)
      for ( var key in state.collection ) {
        state.form.append(key, state.collection[key]);
      }
      console.log(state.collection)
      let response = await fetch('/collections/add', {
        method: 'POST',
        body: state.form
      });
  
      let result = response.json();
      console.log(result);
      alert('gotti gotti')
      setTimeout(()=>{actions.toggleAdd},500)
    }

    return (
      <div class="opac absolute w-full h-full top-0 left-0 pt-20 justify-center" style="z-index:9000;">
        {/* onclick={actions.toggleAdd} causes input click */}
        <div class="w-full flex mx-auto text-gray-800 leading-normal max-w-6xl" >
          <form  class="w-full relative" name="add" id="add" action="/add" method="post" enctype="multipart/form-data">
            
            <div onclick={e=>e.stopPropagation()} class=" mx-auto static px-6 pt-4 mb-4 bg-gray-900 border border-gray-800 rounded shadow md:flex flex-wrap">
              <div class="text-gray-300 opacity-75 absolute top-0 right-0 bg-gray-800 cursor-pointer" onclick={actions.toggleAdd}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentcolor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
              </div>
              <div class="flex flex-wrap px-3 mb-6 w-full">
                <div class="w-full sm:w-64 lg:w-3/12 pr-2 text-gray-300">
                  <label class="block tracking-wide text-gray-300 text-sm font-bold mb-2" for="title">
                    Title
                  </label>
                  <input oninput={e => actions.input({ collection:{...state.collection, title: e.target.value}})} value={state.collection.title} id="title" name="title" class="appearance-none block w-full sm:w-64 lg:w-full bg-gray-600 border border-red-600 py-2 px-4 mb-2" type="text" placeholder="Title"></input>
                  <p class="text-red-600 text-xs italic">Please provide a collection title.</p>
                </div>
                <div class="w-full sm:w-4/12 sm:px-2">
                  <div class="mt-6 justify-center">
                    <button onclick={actions.toggleInactive} class={`${(state.collection.status==0) && "border-4 border-blue-500 shadow-inner sm:-mt-1"} sm:float-right px-3 py-1 font-semibold text-green-900 leading-tight inset-0 bg-blue-300 hover:bg-blue-500  py-2 px-4  opacity-75`} type="button">
                      Inactive
                    </button>
                    <button onclick={actions.toggleActive} class={`${(state.collection.status==1) && "border-4 border-green-500 shadow-inner sm:-mt-1"} sm:float-right px-3 py-1 font-semibold text-green-900 leading-tight inset-0 bg-green-300 hover:bg-green-500  py-2 px-4  opacity-75`} type="button">
                      Active
                    </button>
                  </div>
                </div>
                <div class="flex-grow pr-2 mt-6">
                  <div class="float-right sm:text-center">
                    {/* add outline to button */}
                    <button type="button" onclick={actions.toggleAdd} class="mr-2 bg-gray-600 font-semibold border-b-4 border-red-600 bg-red-500 hover:bg-red-600 text-white shadow-md py-2 px-4 inline-flex items-center">
                      <span class="hidden lg:inline mr-2">Cancel</span>
                      <i fill="currentcolor" class="fas fa-times"></i>
                    </button>
                    <button type="button" onclick={submit} class="mx-2 bg-gray-600 font-semibold border-b-4 border-green-600 bg-green-500 hover:bg-green-600 text-white shadow-md py-2 px-4 inline-flex items-end">
                      <span class="hidden lg:inline mr-2">Save</span>
                      <i fill="currentcolor" class="fas fa-save"></i>
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


