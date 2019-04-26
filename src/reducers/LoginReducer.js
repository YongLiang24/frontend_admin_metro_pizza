const initialState ={
  isLogin: false,
  usernameInput: '',
  passwordInput: ''
}

const LoginReducer = (state= initialState, action) =>{

  switch(action.type){

    case "SUBMIT_LOGIN":
    console.log("check submit", state)
    fetch('http://localhost:3000/api/v1/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ user: {username: this.state.usernameInput,password: this.state.passwordInput} })
      })
      .then(resp => resp.json())
      .then(json =>{

        if(json.jwt){
          return state.isLogin = true
        }
        else{
          return state
        }
      })

    default:
      return state
  }
}
export default LoginReducer;
