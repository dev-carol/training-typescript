import { diaDaSemana } from "../enums/dia-da-semana.enum.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class negociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoeView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoeView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis serão aceitas');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.limparFormulario();
        this.atualizaView();
    }
    ehDiaUtil(data) {
        return data.getDay() > diaDaSemana.DOMINGO && data.getDay() < diaDaSemana.SABADO;
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
