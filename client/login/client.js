const handleLogin = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($("#user").val() === '' || $('#pass').val() === ''){
        handleError("RAWR: Username or password is empty");
        return false;
    }

    console.log($("input[name=csrf]").val());

    sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialized(), redirect);

    return false;
};

const handleSignup = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#user").val() === '' || $("#pass").val() === '' || $("#pass2").val() === ''){
        handleError("RAWR! All fields are required");
        return false;
    }

    if($("#pass").val() !== $("#pass2").val()){
        handleError("RAWR! Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialized(), redirect);

    return false;
}

const loginWindow = (props) => {
    return (
        <form id="loginForm" name="loginForm"
              onSubmit={handleLogin}
              action='/login'
              method="POST"
              className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Sign in"/>
        </form>
    );
};

const signinWindow = (props) => {
    return (
        <form id="signinForm" name="signinForm"
              onSubmit={handleSignup}
              action='/signup'
              method="POST"
              className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Sign Up"/>
        </form>
    );
};

const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    createLoginWindow(csrf); //default views
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.getToken);
    });
};

//why is this out for god and everybody??
$(document).ready(function(){
    getToken();
});

//ended at step 30 (mongo gross)

