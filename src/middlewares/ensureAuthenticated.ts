import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    // Receber o tolkien kkkk
    const authToken = request.headers.authorization;

    // Validar se token está preenchido
    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");
    // Ignora a primeira posição, que vai a palavra Bearer
    // insere o token na variável token

    try {
        // Verificar se o token é válido
        const { sub } = verify(token, "17cfe1d79fb54b8ac709619d00714cd8") as IPayload;
        // forçando o verify a usar a interface | definindo o sub como string na interface

        // Recuperar informações do usuário
        request.user_id = sub;
        
        return next();
    } catch (err) {
        return response.status(401).end();
    }
}