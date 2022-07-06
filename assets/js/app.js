// =================== <--Bloco--> tratativa de Cadastro ===================
//criação do objeto com as funções para tratar o formulário de cadastro
let signupValidator = {
    // ===== <--Bloco--> handleSubmit =====
    // Vai verificar se está tudo em ordem para fazer o cadastro
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
            document.querySelector('#checkSignup').checked = false;
        }
    },// ===== <--Bloco--> handleSubmit =====

    // ===== <--Bloco--> checkInput =====
    //Vai fazer a tratativa de cada input para saber se o mesmo está respeitando as regras de preenchimento
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if (rules !== null) {
            rules = rules.split('|');
            for(let r in rules){
                let rDetails = rules[r].split('=');
                let inputString = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
                switch (rDetails[0]) {
                    //Só pode conter letras
                    case "required-string":
                        if (!inputString.test(input.value)) { //verifica se há números no input
                        return "Este campo nao aceita numeros.";
                        }
                    break;
                    //O campo é obrigatorio
                    case 'required':
                        if (input.value.trim() === '') {
                            return `Este campo não pode ser vazio.`;
                        }
                    break;

                    case 'terms-required':
                        let checkBox = document.querySelector('#checkSignup');
                        if (!checkBox.checked) {
                            return 'Aceite os termos de uso'
                        }
                    break;
                    //Precisa ter um mínimo especificado de caracteres para ser válido
                    case 'min':
                       if (input.value.length < rDetails[1]) {
                           return `O campo precisa ter pelo menos ${rDetails[1]} caracteres`;
                       } 
                    break;
                    //Precisa ser igual ao campo anterior
                    case 'samePassword':
                        let Password = document.querySelector('#password').value;
                        let samePassword = document.querySelector('#samePassword').value;
                       if (samePassword != Password) {
                        return `As senhas precisam ser iguais.`;
                       }
                    break;
                    //Precisa respeitar a expressão regular do tipo 'email'
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
    },// ===== <--Bloco--> checkInput =====


    // ===== <--Bloco--> showError =====
    //Vai mostrar abaixo do input o erro
    showError:(input, error)=>{
        input.style.borderColor = '#F00';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },// ===== <--Bloco--> showError =====


    // ===== <--Bloco--> clearError =====
    //Vai limpar os erros quando o campo for preenchido corretamente
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
};// ===== <--Bloco--> clearError =====


//Atribuindo um evento de envio do formulário
let form = document.querySelector(".signup--Validator");
form.addEventListener('submit', signupValidator.handleSubmit)

// =================== <--Bloco--> Tratativa de Cadastro ===================


// =================== <--Bloco--> Tratativa de login ===================
let login = document.querySelector('#btn-login');
let loginValidate = login.addEventListener('click', (e) => {
    e.preventDefault();
    //Recebendo os valores do Json e atribuindo nas variáveis
    let id = cadastroJson.map(cadastro => cadastro.id);
    let email = cadastroJson.map(cadastro => cadastro.email);
    let password = cadastroJson.map(cadastro => cadastro.password);
    
    //Recebendo os valores do input do formulário
    let pegarEmail = document.querySelector('#login-email').value;
    let pegarPassword = document.querySelector('#login-password').value;

    //Verificando se os campos estão vazios
    if ((pegarEmail.length === 0) && (pegarPassword.length === 0) ) {
        alert("Email ou senha sem preencher");
        return false
    }
    
    //verificando se encontrou os dados do usuário
    let encontrou = false;
    for (let i = 0; i < id.length; i++) {
        if ((pegarEmail === email[i]) && (pegarPassword == password[i])) {
            encontrou = true;
        }
    }

    //Tratando a resposta do looping
    if (!encontrou) {
        alert('Email ou senha incorreta');
    }else{
        window.location.href = "home.html";
    }
})

// =================== <--Bloco--> Tratativa de login ===================


// =================== <--Bloco--> Limpar tela do Modal Signup ===================  
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
// =================== <--Bloco--> Limpar tela do Modal Signup ===================


// =================== <--Bloco--> Limpar tela do Modal Login ===================
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
// =================== <--Bloco--> Limpar tela do Modal Login ===================


// =================== <--Bloco--> Armazenar cadastros na tabela ===================
class Cadastro {//criando a classe
    // ==== <--Bloco--> Constructor ==== 
    // Usado para criar propriedades padrão dos objetos, onde todos os objetos da classe vão receber essas propriedades
    constructor() {
        this.id = 1;
        this.arrayCadastros = []
    }
    // ==== <--Bloco--> Constructor ====


    // ==== <--Bloco--> salvarCadastro ==== 
    // Usado pra salvar os dados cadastrados na Tabela
    salvarCadastro(){
        let cadastro = this.lerDados();


        if(this.validator(cadastro)) {
            this.adicionar(cadastro);
            this.arrayCadastros;
        }
        
        this.listarCadastro();
    }
    // ==== <--Bloco--> salvarCadastro ==== 


    // ==== <--Bloco--> listarCadastro ====
    // Responsável por listar item a item o que vai ser inserido na tabela dos cadastros
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
    // ==== <--Bloco--> listarCadastro ====


    // ==== <--Bloco--> adicionar ==== 
    //Vai adicionar no array de cadastro os itens após serem listados
    adicionar(cadastro){

        this.arrayCadastros.push(cadastro);
        this.id ++;

    }
    // ==== <--Bloco--> adicionar ==== 


    // ==== <--Bloco--> lerDados ==== 
    //Vai ler os campos de input do formulário e inserir no objeto cadastro
    lerDados(){
        let cadastro = {}

        cadastro.id = this.id;
        cadastro.name = document.querySelector('#name').value;
        cadastro.email = document.querySelector('#email').value;
        cadastro.password = document.querySelector('#password').value;

        return cadastro;
    }
    // ==== <--Bloco--> lerDados ==== 


    // ==== <--Bloco--> validator ==== 
    //Vai verificar se os campos do login estão vazios
    validator(cadastro){
        let status = false;
        if (cadastro.name == '') {
            status = false;
        }
        if (cadastro.email == '') {
            status = false;
        }
        if (cadastro.password == '') {
            status = false;
        }

        if (status !== false) {
            return false;
        }

        return true;
    }
}
// ==== <--Bloco--> validator ==== 

let cadastro = new Cadastro();//chamando a classe a um novo objeto
