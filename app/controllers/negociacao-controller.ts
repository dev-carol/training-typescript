import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";


export class negociacaoController{
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private  negociacoes = new Negociacoes();

    constructor(){
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor')
    }

    adiciona():void{
        const negociacao = this.criarNegociacao();
        this.negociacoes.adiciona(negociacao);
        console.log(this.negociacoes.lista());
        this.limparFormulario();
    }

    criarNegociacao(): Negociacao{
        const formatacaoDate = /-/g;
        const date = new Date(this.inputData.value.replace(formatacaoDate, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);

        return new Negociacao( date, quantidade, valor );
    }

    limparFormulario():void{
        this.inputData.value = '',
        this.inputQuantidade.value = '',
        this.inputValor.value = '',
        this.inputData.focus();   
    }
}