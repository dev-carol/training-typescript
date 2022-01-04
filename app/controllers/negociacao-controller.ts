import { diaDaSemana } from "../enums/dia-da-semana.enum.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";


export class negociacaoController{
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoeView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor(){
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoeView.update(this.negociacoes);

    }

   public adiciona():void{
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
            if (!this.ehDiaUtil(negociacao.data)){
                this.mensagemView.update('Apenas negociações em dias úteis serão aceitas');
                return;
            }
            this.negociacoes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaView();
 
    }

    private ehDiaUtil (data:Date){
        return data.getDay() > diaDaSemana.DOMINGO && data.getDay() < diaDaSemana.SABADO;
    }

    private limparFormulario():void{
        this.inputData.value = '',
        this.inputQuantidade.value = '',
        this.inputValor.value = '',
        this.inputData.focus();   
    }

    private atualizaView():void{
        this.negociacoeView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}