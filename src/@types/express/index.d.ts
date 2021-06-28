declare namespace Express{
    export interface Request{
        user_id: string;
    }
}

// Sobescrevendo tipagem da biblioteca do express para inserir nova propriedade