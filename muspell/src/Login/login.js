import { Component } from 'react'
import axios from 'axios'

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usersJoined: []
        }
    }

    setName = (newVal) => {
        // this.setState({ user: [...nameValue ]});
        this.setState(prevState => ({
            usersJoined: [...prevState.usersJoined, newVal]
        }))

    }




    componentDidMount() {
        var x = this;
        window.Echo.channel('directv').listen('Hello', function (e) {

            x.setName(e.data.original);

        });



    }

    login_(event) {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        axios.post('http://127.0.0.1:8000/api/auth/login', {
            email: email,
            password: password
        }).then(function (response) {
            let token = response.data.access_token
            // console.log();
            localStorage.setItem('Bearer', 'Bearer ' + token);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUser_() {
        axios.defaults.headers.common['Authorization'] = `${localStorage.getItem('Bearer')}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        // axios.get('http://127.0.0.1:8000/api/auth/user').then(function (response) {
        //     console.log(response)
        // })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        axios.get('http://127.0.0.1:8000/api/auth/user-socket').then(function (response) {
            console.log(response)
        })
            .catch(function (error) {
                console.log(error);
            });


    }


    render() {
        return (
            <div>
                <form onSubmit={this.login_}>
                    <input type="text" placeholder="email"></input>
                    <input type="text" placeholder="password"></input>
                    <button>Enviar</button>
                </form>
                <button onClick={this.getUser_}>
                    User
                </button>

                {this.state.usersJoined.map(function (value, index, array) {
                    return <h1 key={index}>{value.name} joined the room!</h1>
                })
                }

            </div>
        )

    }

}

export default Login;