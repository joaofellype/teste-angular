import Assunto from "./Assunto";

export default class Chamado {
  idChamado!:number;
  solicitante!:string;
  responsavel!:string;
  assuntos!:Assunto[];
  status!:string;
  descricao!: string;
  causaRaiz!: string;
  solucaoProposta!: string;
}
