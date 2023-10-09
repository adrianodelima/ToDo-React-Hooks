export const generateRandomToken = () => {
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    const token = Array.from(randomBytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');

    return token;
}

export const addToken = () => {
        // Verificando se Token já existe
        const cachedToken = localStorage.getItem('authToken');

        if (cachedToken) {
            return cachedToken;
        } else {
          // Criando token e armazenando
          const newToken = generateRandomToken();
          localStorage.setItem('authToken', newToken);

          return newToken;
        }
}