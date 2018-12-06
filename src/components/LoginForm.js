import React,{Component} from 'react'
import { Text } from 'react-native'
import {Card, CardSection,Button,Input} from './common'

class LoginForm extends Component {

    constructor(props){
        super(props);
        
        this.state={
            email:'',
            password:'',
            status:'',
            error:'',
            loginAttempts:0
        }
        this.onLoginPress = this.onLoginPress.bind(this)
    }

    onLoginPress(e) {
        fetch('http://localhost:3000/login',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                session: {
                    email: this.state.email,
                    password: this.state.password
                }
            })
        })
        .then(response => {
            if (response.ok){
                this.setState({ error:'',count:0})
            }
            if (!response.ok) { throw response }
        })
        .catch(err => {
            this.authFailed(err)
            this.increaseLoginAttempts()
            this.clearFields()
        })
    }
    
    authFailed(err){
        {
            this.setState({
                error:''
            })

            if(this.state.email === "" && this.state.password === ""){
                this.setState({
                    error:"Please fill out required fields"
                })
            } else {
                this.setState({
                    error: err.text()._55
                })
            }
        }
    }

    clearFields(){
        {
        if(this.state.error === "Incorrect Password"){
            this.setState({
                password:''
            })
        } else {
            this.setState({
                email:'',
                password:''
            })
        }
    }
    }

    tooManyLoginAttempts(){
        {
            if(this.state.loginAttempts>3){
              return  (<Text>Too many failed attempts</Text>)
            }
        }
    }

    increaseLoginAttempts(){
        {
            if(this.state.status ==="failed"){
                this.state.loginAttempts += 1
            }
        }
    }

   

    render(){
        return(
            <Card>
                <CardSection>
                    <Input 
                        value={this.state.email}
                        onChangeText={email => this.setState({email})}
                        placeHolder={"example@gmail.com"}
                        label={"Email"}
                    />

                </CardSection>
                
                <CardSection>
                    <Input 
                        value={this.state.password}
                        onChangeText={ password => this.setState({ password })}
                        secureTextEntry={true}
                        placeHolder={"ab23sXs"}
                        label={"Password"}                   
                    ></Input>                    
                </CardSection>

                <Text style={styles.errorMessage}>
                    {this.state.error}
                </Text>

                <CardSection>
                    <Button 
                        buttonText={"Login"}
                        onPress={this.onLoginPress}
                    />
                </CardSection>

            </Card>
        )
    }
}

const styles = {
    errorMessage:{
        color:'red',
        fontSize:20,
        alignSelf:'center',
    }
}

export default LoginForm;