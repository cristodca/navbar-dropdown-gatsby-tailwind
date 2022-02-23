import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby';
import { useLocation } from '@reach/router'
import { BASE_URL } from '../assets/_variables';

const Navbar = () => {
  const location = useLocation()
  const [activeTab] = useState(location.pathname)
  const navMenu = useRef(null)
  const navBar = useRef(null)

  const tabs = [
    { id: 1, slug: `/`, text: 'Inicio' },
    { id: 2, slug: `#`, text: 'Nosotros' },
    { id: 3, slug: `#`, text: 'Soluciones Integrales', sub: [
      { id: 1, slug: '#', text: 'Solución #1' },
      { id: 2, slug: '#', text: 'Solución #2' },
      { id: 3, slug: '#', text: 'Solución #3' },
    ] },
    { id: 4, slug: `#`, text: 'Proyectos', sub: [
      { id: 1, slug: '#', text: 'Proyecto #1' },
      { id: 2, slug: '#', text: 'Proyecto #2' },
      { id: 3, slug: '#', text: 'Proyecto #3' },
      { id: 4, slug: '#', text: 'Proyecto #4' },
    ] },
    { id: 5, slug: `#`, text: 'Contacto' },
  ]

  useEffect(() => {
  
  })

  const navMenuClick = () => {
    console.log('click')
    navMenu.current.classList.toggle('h-0')
    navMenu.current.classList.toggle('h-screen')
  }

  const dropdownClick = (id) => {
    const subMenu = document.getElementById(`dropdownMenu${id}`)
    subMenu.classList.toggle('hidden')
  }
  
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      const window_size = window.innerWidth || document.body.clientWidth
      if (window_size > 768)
        navMenu.current.classList.remove('h-screen')
    })
  }

  return (
    <nav ref={navBar} className='fixed top-0 left-0 right-0 h-24 lg:h-20 z-50 bg-neutral-900 shadow lg:flex lg:items-center' role='navigation'>
      <div className='lg:container lg:mx-auto flex flex-wrap items-center lg:flex-nowrap'>
        <Link className='p-4 text-white font-bold' to='#'>
          @cristodca
        </Link>

        <div className='ml-auto lg:hidden p-4'>
          <button
            onClick={() => navMenuClick()}
            className='flex items-center px-3 py-2 border rounded'
            type='button'
          >
            <svg className='h-3 w-3 text-neutral-100' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <title>Menu</title>
              <path fill='currentColor' d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
        </div>

        <div ref={navMenu} className='w-full h-0 transition-all ease-out duration-500 lg:transition-none lg:w-auto lg:flex-grow lg:flex lg:items-center overflow-hidden lg:overflow-visible bg-neutral-900'>
          <ul className='flex flex-col duration-300 ease-out sm:transition-none mt-5 mx-4 lg:flex-row lg:items-center lg:mx-0 lg:ml-auto lg:mt-0 lg:pt-0 lg:border-0'>
            {
              tabs.map(tab => 
                <li 
                  key={tab.id}
                  onClick={
                    tab.sub ? () => { dropdownClick(tab.id) } : ''
                  } 
                  className={
                    activeTab === tab.slug 
                    ? `${ tab.sub ? 'dropdown group' : ''} p-2 lg:ml-1 hover:cursor-pointer text-red-700 bg-white rounded text-base lg:text-lg`
                    : `${ tab.sub ? 'dropdown group' : ''} p-2 lg:ml-1 hover:cursor-pointer text-neutral-100 hover:text-red-700 hover:bg-white hover:rounded text-base lg:text-lg` }
                >
                {
                  tab.sub
                  ?
                  <Link 
                    className='font-bold uppercase block lg:inline-block lg:normal-case w-full lg:w-auto'>
                    {tab.text}
                  </Link>
                  :
                  <Link 
                    to={tab.slug}  
                    className='font-bold uppercase block lg:inline-block lg:normal-case w-full lg:w-auto'>
                    {tab.text}
                  </Link>
                }
                {
                  tab.sub &&
                  <div id={`dropdownMenu${tab.id}`} className='dropdown-menu hidden absolute w-64 lg:w-32 lg:mt-4 bg-white overflow-hidden rounded shadow'>
                    <ul>
                      {
                        tab.sub.map((sub) => {
                          return(
                            <li key={sub.id}>
                              <Link 
                                to={sub.slug}
                                className='p-2 hover:bg-slate-100 text-black w-full block'>
                                {sub.text}    
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                }    
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}
 
export default Navbar;