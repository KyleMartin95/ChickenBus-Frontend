import {
    ILogin,
    ILoginProps,
    ILoginStyles
} from './Login.Props';
import { BaseComponent, getRTL, autobind } from "office-ui-fabric-react/lib/Utilities";
import { List } from "office-ui-fabric-react/lib/List";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Label } from "office-ui-fabric-react/lib/Label";
import { PrimaryButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { getStyles } from "./Login.styles";
//import { exampleBlogItem } from "../../MockData/FrontEndConsts";
import { Image, ImageFit } from "office-ui-fabric-react/lib/Image";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import * as React from "react";

import { Container, Navbar, NavItem, Button } from 'react-materialize';
import { Redirect } from 'react-router-dom';

import Auth from "../../modules/Auth";

interface ILoginState {
}
const styles: ILoginStyles = getStyles();

export class Login extends BaseComponent<ILoginProps, ILoginState> {
    private _username: TextField;
    private _email: TextField;
    private _password: TextField;

    constructor(props: ILoginProps) {
        super(props);
        this.state = {
            errors: {},
            user: {
                username: '',
                password: '',
                permissionLevel: null
          }
        }
    }

    public render() {
        return(
          <div style={ styles.root }>
                <Label> Username </Label>
                    <TextField componentRef={this._resolveRef("_username")}/>
                <Label> Password </Label>
                    <TextField type="password" componentRef={this._resolveRef("_password")}/>
                <div style={styles.loginButton}>
                    <Button style={ styles.loginButton } onClick={this._onLoginPress}> Login </Button>
                </div>
          </div>
        )
    }

    @autobind
    private _onLoginPress() {
        let loginDetails = {
            username: this._username.value,
            password: this._password.value
        };

        fetch('/auth/login', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(loginDetails)
        }).then((res: any) => {
            if(!res.ok){
                this.setState({errors: res});
                alert("Could not log you in successfully. Please check login credentials");
                throw Error(res.statusText);
            }else{
                return res.json();
            }
        }).then(responseJson => {
            Auth.authenticateUser(responseJson.token);
            this.setState({user: responseJson.user});
            window.location.href = "/"
        }).catch(err => {
            console.log(err);
        });
    }
}
