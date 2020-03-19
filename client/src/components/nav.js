import { h } from 'hyperapp'
import { Link, location } from "@hyperapp/router"
import  data  from '../data'

export default {
    state: {
      navToggle: false
    },
    actions: {
      showLinks: state => ({ navToggle: true }),
      hideLinks: state => ({ navToggle: false })
    },
    view: (state, actions) => ({path}) => {
        const toggle = (evt) => {
            if (state.navToggle) actions.hideLinks()
            else actions.showLinks()
        };
        let page = path.split('/')[1]
        let currentColor = data.constants.pathColors.filter(route => route.path == page)[0].color
        return (
            <div class="fixed w-full" style="z-index:9001;">
                <nav id="header" class="bg-gray-900 relative w-full z-10 top-0 shadow border border-gray-800 ">
                    <div class="w-full max-w-6xl container mx-auto flex flex-wrap items-center mt-0 py-2">
                        <div class="w-full md:flex md:items-center lg:items-base">
                            <span class="flex md:inline px-8 md:px-0 md:w-64">
                                <div class="w-5/6 md:w-full pull-right pl-4 md:pr-0">
                                    <h1 class={`text-${currentColor}-600 font-black text-2xl inline-block`}>Administration</h1>
                                    <i class={`text-${currentColor}-600 fas fa-user-cog pr-0 md:pr-1`}></i>
                                    {/* <h1 class={`text-${currentColor}-600 font-black text-3xl inline-block`}>Panel</h1> */}
                                </div>
                                <div class="md:hidden w-1/6 flex-auto relative inline-block">
                                    {/* Nav Toggle */}
                                    <div class="block pr-4">    
                                        <button onclick={toggle} id="nav-toggle" class={`${state.navToggle && 'border-teal-500'} flex float-right items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-100 hover:border-teal-200 appearance-none focus:outline-none`}>
                                            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </span>
                            <div class={`${!state.navToggle && 'hidden'} md:inline md:visible w-full content-center text-left justify-between flex-grow md:flex md:items-center md:w-auto md:block mt-2 sm:mt-0 bg-gray-900 z-20`}>
                                <ul class="list-reset w-full flex flex py-2 md:py-0 px-1 md:px-2 text-center justify-between">
                                    <Link to='/' class="mx-3 flex-auto md:flex-none" onclick={actions.hideLinks}>
                                        <a href="#" class={`${(path == '/') && 'border-yellow-600'} block px-2 lg:px-4 py-1 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-yellow-500`}>
                                            <i class={`${(path == '/') && 'text-yellow-600'} fas fa-tachometer-alt pr-0 md:pr-3`}></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Dash</span>
                                        </a>
                                    </Link>
                                    <Link to='/messages' class="mx-3 flex-auto md:flex-none" onclick={actions.hideLinks}>
                                        <a href="#" class={`${(path == '/messages') && 'border-red-600'} block px-2 lg:px-4 py-1 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-red-500`}>
                                            <i class={`${(path == '/messages') && 'text-red-600'} fas fa-inbox pr-0 md:pr-3`}></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Messages</span>
                                        </a>
                                    </Link>
                                    <Link to='/tasks' class="mx-3 flex-auto md:flex-none" onclick={actions.hideLinks}>
                                        <a href="#" class={`${(path == '/tasks') && 'border-green-600'} block px-2 lg:px-4 py-1 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-green-500`}>
                                            <i class={`${(path == '/tasks') && 'text-green-600'} fas fa-tasks pr-0 md:pr-3`}></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Tasks</span>
                                        </a>
                                    </Link>
                                    <Link to='/products' class="mx-3 flex-auto md:flex-none" onclick={actions.hideLinks}>
                                        <a href="#" class={`${(path == '/products') && 'border-pink-600'} block px-2 lg:px-4 py-1 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500`}>
                                            <i class={`${(path == '/products') && 'text-pink-600'} fas fa-store-alt pr-0 md:pr-3`}></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Products</span>
                                        </a>
                                    </Link>
                                    <Link to='/collections' class="mx-3 flex-auto md:flex-none" onclick={actions.hideLinks}>
                                        <a href="#" class={`${(path == '/collections') && 'border-blue-600'} block px-2 lg:px-4 py-1 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-500`}>
                                            <i class={`${(path == '/collections') && 'text-blue-600'} fas fa-stream pr-0 md:pr-3`}></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">Collections</span>
                                        </a>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* colored bar under nav */}
                <div class={`relative w-full bg-${currentColor}-700 h-1 pb-3 text-xl text-white text-center`}>
                 </div>
            </div>
            
        )
    }
}
