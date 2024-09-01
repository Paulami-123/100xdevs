import { useEffect, useState } from 'react';
import links from './links';

export default function CreateAnchorElement(){
  const [object, setObject] = useState('');

  const elementData = {
    type: 'a',
    props: {
      href: links[Math.floor(Math.random()*links.length)],
      target: '_blank',
      text: 'Click me',
    },
  }

  function generateHTML(elementData) {
    const { type, props } = elementData;
    const text = props.text || ''
    const attributes = Object.keys(props)
      .filter((key) => key !== 'children')
      .map((key) => `${key}="${props[key]}"`)
      .join(' ');

    setObject(`<${type} ${attributes}>${text}</${type}>`);
  }

  function customRender(elementData, container) {
    const element = generateHTML(elementData);
    container.innerHTML = element
  }

  useEffect(() => {
    customRender(elementData, document.getElementsByClassName('element1'))
  }, []);

  return (
  <div>
    <div>
      <div className="relative">
        <img className='h-screen w-screen' 
        src="https://static.vecteezy.com/system/resources/previews/003/066/810/non_2x/abstract-minimalist-hand-drawn-background-free-vector.jpg" />
        <div className="absolute inset-0 grid grid-rows-2 place-items-center mx-auto my-auto">
          <div className="text-6xl p-8 font-dance font-extrabold">
            Want to visit a random website?
          </div>
          <div className='absolute px-4 py-2 rounded-lg bg-[#ec4899] text-lg font-medium element1' dangerouslySetInnerHTML={{ __html: object }} ></div>
        </div>
      </div>
    </div>
  </div>
  )
}