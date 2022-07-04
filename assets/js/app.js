// VALIDADOR DO FORMULÁRIO DE CADASTRO
let signupValidator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');
        signupValidator.clearError();
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = signupValidator.checkInput(input);
            if (check !== true) {
                send = false;
                signupValidator.showError(input, check);
            }
        }
        
        if (send) {
            alert('Cadastrado com sucesso!');
            document.querySelector('#name').value = '';
            document.querySelector('#email').value = '';
            document.querySelector('#password').value = '';
            document.querySelector('#samePassword').value = '';
        }
    },
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for(let r in rules){
                let rDetails = rules[r].split('=');
                let inputString = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
                switch (rDetails[0]) {
                    case "required-string":
                        if (!inputString.test(input.value)) { //verifica se há números no input
                        return "Este campo nao aceita numeros.";
                        }
                    break;
                    case 'required':
                        if (input.value.trim() === '') {
                            return `Este campo não pode ser vazio.`;
                        }
                    break;
                    case 'min':
                       if (input.value.length < rDetails[1]) {
                           return `O campo precisa ter pelo menos ${rDetails[1]} caracteres`;
                       } 
                    break;
                    case 'samePassword':
                        let Password = document.querySelector('#password').value;
                        let samePassword = document.querySelector('#samePassword').value;
                       if (samePassword != Password) {
                        return `As senhas precisam ser iguais.`;
                       }
                    break;
                    case 'email':
                       if (input.value != '') {
                           let expRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                           if (!expRegular.test(input.value.toLowerCase())) {
                               return `E-mail digitado não é válido!`;
                           }
                       } 
                    break;
                
                    default:
                        break;
                }
            }
        }
        return true;
    },
    showError:(input, error)=>{
        input.style.borderColor = '#F00';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearError:()=>{
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';         
        }
        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();          
        }
    }
};

let form = document.querySelector(".signup--Validator");
form.addEventListener('submit', signupValidator.handleSubmit)

let login = document.querySelector('#btn-login');
let loginValidate = login.addEventListener('click', (e) => {
    e.preventDefault();
    let id = cadastroJson.map(cadastro => cadastro.id);
    let email = cadastroJson.map(cadastro => cadastro.email);
    let password = cadastroJson.map(cadastro => cadastro.password);
    
    let pegarEmail = document.querySelector('#login-email').value;
    let pegarPassword = document.querySelector('#login-password').value;

    console.log(pegarEmail, pegarPassword)
    for (let i = 0; i < id.length; i++) {
        if (pegarEmail.length === 0 ) {
            alert("Por favor, preencha o email.");
            return false
        }
        if (pegarPassword.length === 0 ) {
            alert("Por favor, preencha a senha.");
            return false
        }
        if (pegarEmail === email[i]) {
            if (pegarPassword == password[i]) {
                alert('login efetuado')
                return false
            }
        } 

        if (pegarEmail !== email[i]) {
            alert('');
        }
    }
})
  
function clearModalSignup() {
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#password').value = '';
    document.querySelector('#samePassword').value = '';
    let inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].style = '';         
    }
    let errorElements = document.querySelectorAll('.error');
    for (let i = 0; i < errorElements.length; i++) {
        errorElements[i].remove();          
    }
}  

function clearModalSignin() {
    document.querySelector('#login-email').value = '';
    document.querySelector('#login-password').value = '';
    let inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].style = '';         
    }
    let errorElements = document.querySelectorAll('.error');
    for (let i = 0; i < errorElements.length; i++) {
        errorElements[i].remove();          
    }
} 

class Cadastro {
    constructor() {
        this.id = 1;
        this.arrayCadastros = []
    }
    salvarCadastro(){
        let cadastro = this.lerDados();


        if(this.validator(cadastro)) {
            this.adicionar(cadastro);
            this.arrayCadastros;
        }
        
        this.listarCadastro();
    }

    listarCadastro(){
        let tbody = document.querySelector('#tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayCadastros.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_name = tr.insertCell();
            let td_email = tr.insertCell();
            let td_password = tr.insertCell();

            td_id.innerText = this.arrayCadastros[i].id;
            td_name.innerText = this.arrayCadastros[i].name;
            td_email.innerText = this.arrayCadastros[i].email;
            td_password.innerText = this.arrayCadastros[i].password;

            td_id.classList.add('center');
            td_name.classList.add('center');
            td_email.classList.add('center');
            td_password.classList.add('center');
        }
    }

    adicionar(cadastro){

        this.arrayCadastros.push(cadastro);
        this.id ++;

    }

    lerDados(){
        let cadastro = {}

        cadastro.id = this.id;
        cadastro.name = document.querySelector('#name').value;
        cadastro.email = document.querySelector('#email').value;
        cadastro.password = document.querySelector('#password').value;

        return cadastro;
    }

    validator(cadastro){
        let status = false;
        if (cadastro.name == '') {
            status += false;
        }
        if (cadastro.email == '') {
            status += false;
        }
        if (cadastro.password == '') {
            status += false;
        }

        if (status !== false) {
            return false;
        }

        return true;
    }
}

let cadastro = new Cadastro();
