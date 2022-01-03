import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class negociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoeView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.DOMINGO = 0;
        this.SABADO = 6;
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoeView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = this.criarNegociacao();
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis serão aceitas');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }
    ehDiaUtil(data) {
        return data.getDay() > this.DOMINGO && data.getDay() < this.SABADO;
    }
    criarNegociacao() {
        const formatacaoDate = /-/g;
        const date = new Date(this.inputData.value.replace(formatacaoDate, ','));
        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);
        return new Negociacao(date, quantidade, valor);
    }
    limparFormulario() {
        this.inputData.value = '',
            this.inputQuantidade.value = '',
            this.inputValor.value = '',
            this.inputData.focus();
    }
    atualizaView() {
        this.negociacoeView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso');
    }
}
