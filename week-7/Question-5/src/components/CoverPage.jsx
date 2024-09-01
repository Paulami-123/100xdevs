import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CoverPage(){
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const submitHandle = async () => {
      try {
        localStorage.clear();
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        )
        const data = response.data;
        console.log(data);
        localStorage.setItem('username', data.login);
        localStorage.setItem('img', data.avatar_url);
        localStorage.setItem('git', data.html_url);
        if(data.twitter_username){
          localStorage.setItem('twitter', data.twitter_username);
        }
        if(data.blog!==""){
          localStorage.setItem('blog', data.blog);
        }
        navigate('/card1?name='+data.login);
      } 
      catch (error) {
        alert('Please enter a valid username');
      }
    }
    return <div>
      <div className="relative">
        <img className='h-screen w-screen' src="https://static.vecteezy.com/system/resources/previews/007/740/967/original/abstract-art-gold-tropical-leaves-background-luxury-wallpaper-with-watercolor-tropical-leaf-framed-exotic-color-free-vector.jpg" />
        <div className="absolute inset-0 grid grid-rows-3 place-items-center mx-auto my-auto">
          <div className="text-6xl p-8 font-dance font-extrabold">
            Get Customised Business Cards !!!
          </div>
          <div className='flex flex-row items-center justify-center w-full gap-4 py-20 '>
            <input className='border-2 border-black w-[40%] p-2 rounded-lg' type='text' onChange={(e) => {
              setUsername(e.target.value)
            }} placeholder='Enter GitHub username' name='username'/>
            <button className='px-4 py-2 text-lg text-white bg-gray-950 hover:bg-gray-500 rounded-xl' onClick={submitHandle}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  }