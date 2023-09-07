
const EnterInPage=()=>{
    
    const token='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'

    const setToken=(token)=>{
     localStorage.setItem('token',token)
    }
    
      const requestToken=()=>{
        
        fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=140186adabfafc0430c9439d76912a88`)
      .then(response => response.json())
      .then(response => setToken(response.request_token))
      .catch(err => console.error(err));
      }
    const checkLocalStorage=(id)=>{
      localStorage.setItem('sessionId',id)
      console.log(id)
    }
      const permissionUser=()=>{
        const myOptions = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDAxODZhZGFiZmFmYzA0MzBjOTQzOWQ3NjkxMmE4OCIsInN1YiI6IjY0YTAxNjg1NGE1MmY4MDBlODJkNjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Gl1ryFSJiWHXhKjzFXBD_ZB3o9GGEOgPlw2Sr-hkhpE'
          },
           body: JSON.stringify({request_token: localStorage.getItem('token')}) 
        };
        
        fetch('https://api.themoviedb.org/3/authentication/session/new',myOptions)
          .then(response => response.json())
          .then(response =>  checkLocalStorage(response.session_id))
          .catch(err => console.error(err));
      }
      const checkProfile=()=>{
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        };
        
        fetch(`https://api.themoviedb.org/3/account/20090380?session_id=${localStorage.getItem('sessionId')}`,options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));
      }

      return(
        <div className="auth">
          <p>Авторизуйтесь</p>
          <button onClick={requestToken}>Отримати реквест токен</button>
          <a href={`https://www.themoviedb.org/authenticate/${localStorage.getItem('token')}?redirect_to=http://localhost:3000/auth
    `}>Продовжити сайті</a>
          <button onClick={permissionUser}>Далі</button>
          <button onClick={checkProfile}>Провірити профіль</button>
        </div>
      )
    }
    
    export default EnterInPage